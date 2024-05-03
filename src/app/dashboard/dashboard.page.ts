import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ConfigPage } from '../config/config.page';
import { LoadingService } from '../providers/loading.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AlertService } from '../services/alert-service';
import { TopicInfoPage } from '../topic-info/topic-info.page';
import { AddTopicPage } from '../add-topic/add-topic.page';
import { HttpService } from '../services/http-service';
import { jsPDF } from 'jspdf';  
import * as d3 from 'd3';
import * as d3Cloud from 'd3-cloud';
import * as Papa from 'papaparse';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('wordCloudContainer', { static: false }) wordCloudContainer: ElementRef;
  @ViewChild('cardWordContainer', { read: ElementRef }) cardWordContainerRef: ElementRef;
  @ViewChild('fileInputRef', { static: false }) fileInputRef!: ElementRef;

  // Form fields
  regions: any;
  industries: any;
  topics = [];
  search: string;
  industrySelected: string;
  regionSelected: string;
  topicSelected: string;

  fromDate: string;
  toDate: string;

  // News data
  newsData: any;
  selectedFile: File;

  // Chart objects
  sentimentChart: any;
  sentimentChartOpts = {
    series: [
      {
        name: "distibuted",
        data: []
      }
    ],
    chart: {
      height: 390,
      width: '100%',
      type: "bar"
    },
    colors: ['#0f9e30', '#Ada8c9', "#E40909"],
    plotOptions: {
      bar: {
        columnWidth: "30px",
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: ["Positive", "Neutral", "Negative"],
      labels: {
        style: {
          colors: ['#0f9e30', '#Ada8c9', "#E40909"],
          fontSize: "12px"
        }
      }
    }
  };
  wordData = [];
  gdpChart: any;
  gdpChartOpts = {
    series: [
      {
        name: 'Annual GDP growth (percent change)',
        data: []
      },
      {
        name: 'Annual average inflation (consumer prices) rate',
        data: []
      }
    ],
    chart: {
      width: '100%',
      type: "area"
    },
    xaxis: {
      categories: []
    },
    stroke: {
      curve: "smooth",
      width: 1
    },
    title: {
      text: ''
    }
  };

  // Gen AI Responses
  globalInsights: string;
  sentiments: any;
  keyPhrases = [];
  positiveCount = 0;
  negativeCount = 0;
  neutralCount = 0;

  // Loaders
  isLoadingInsights = false;
  isLoadingSentmts = false;
  isLoadingKeyph = false;
  exporting = false;
  isPrinting = false;

  // Screen size
  isMobile = false;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService: MsalService,
    private alertService: AlertService,
    private httpService: HttpService,
    private platform: Platform
  ) {
    this.initForm();
  }

  initForm() {
    this.toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const sixMonthsAgoDate = new Date();
    sixMonthsAgoDate.setMonth(sixMonthsAgoDate.getMonth() - 3);
    this.fromDate = this.datePipe.transform(sixMonthsAgoDate, 'yyyy-MM-dd');
    this.http.get('assets/json/regions.json').subscribe((regions) => {
      this.regions = regions;
    });
    this.http.get('assets/json/industries.json').subscribe((industries) => {
      this.industries = industries;
    });
    // this.getRegions();
    this.getTopics();
    this.getIndustries();
  }

  ngOnInit() {
    this.detectScreenSize();
  }

  // ionViewDidEnter() {
  //   this.wordData = [{
  //     text: "one",
  //     size: 10,
  //     value: 10
  //   }];
  //   for (let i = 0; i < 20; i++) {  
  //     this.wordData.push({  
  //       text: `word${i}`,  
  //       size: 20,  
  //       value: 30  
  //     });  
  //   }  
  //   this.drawWordChart();
  // }

  @HostListener('window:resize', ['$event'])  
  onWindowResize(event: any) {  
    // Handle window resize event here  
    this.drawWordChart();
    this.detectScreenSize();
  }
  
  // Method to detect screen size
  detectScreenSize() {
    if (this.platform.is('tablet') || this.platform.is('ipad') || this.platform.width() >= 768) {
      console.log('Screen size is MD (Medium)');
      // Do something for medium-sized screens (MD)
      this.isMobile = false;
    } else {
      console.log('Screen size is SM (Small)');
      this.isMobile = true;
      // Do something for small-sized screens (SM)
    }
  }

  drawWordChart() {
    let data = this.wordData.slice(0, 50);
    const colorScale = d3.scaleOrdinal()
      .domain([0, 50]) // Define the domain of values  
      .range(['#cc33ff', '#33cc33', '#ff3300', '#0000ff', '#00cccc', '#237291', '#9d2j42', '#a2j4ld']); // Define the range of colors  

    const cardElement = this.cardWordContainerRef.nativeElement as HTMLElement;
    const cardWidth = cardElement.offsetWidth - 20;
    const cardHeight = cardElement.offsetHeight - 20;

    const divChart = document.querySelector('.div-chart');
    const svgElement = divChart.querySelector('svg');

    if (svgElement) {
      svgElement.remove();
    }

    const wordCloudSvg = d3.select(this.wordCloudContainer.nativeElement)
      .append('svg')
      .attr('width', cardWidth)
      .attr('height', cardHeight);

    const layout = d3Cloud()
      .size([cardWidth, cardHeight])
      .words(data)
      .padding(3)
      .rotate(() => (Math.random() * 2) * 0) // Random rotation  
      .font('Arial')
      .fontSize((d) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      wordCloudSvg
        .append('g')
        .attr('transform', `translate(${cardWidth / 2},${cardHeight / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => d.size + 'px')
        .style('fill', (d) => colorScale(d.value)) // Assign color based on value  
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }

  async config() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();

    // const modal = await this.modalCtrl.create({
    //   component: ConfigPage,
    //   cssClass: 'auto-height'
    // });
    // modal.present();
    // const { data, role } = await modal.onWillDismiss();
    // if (data) {
    //   console.log("File", role)
    //   let file = role;
    //   this.generateInsights(file);
    // }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    Papa.parse(this.selectedFile, {
      header: true,
      complete: (results) => {
        console.log('Parsed CSV:', results.data);
        this.newsData = results.data;
        this.generateInsights(this.newsData);
        this.generateKeyPhrases(this.newsData);
        this.generateSentiments(this.newsData);
        this.fileInputRef.nativeElement.value = '';
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        this.fileInputRef.nativeElement.value = '';
        // Handle the error  
      }
    });
  }

  logout() {
    this.authService.logoutRedirect();
  }

  canAnalyse() {
    return this.regionSelected?.length > 0 && this.topicSelected?.length > 0;
    // return this.search?.length > 0;
  }

  analyse() {
    this.getGlobalMediaData();
  }

  async onRegionChange() {
    this.gdpChart = undefined;
    if (!this.regionSelected)
      return;

    const gdpFile = '../../assets/gdp/world_gdp_data.csv';
    const inflationFile = '../../assets/gdp/global_inflation_data.csv';

    let gdpData, inflationData;

    try {
      gdpData = await this.parseCSV(gdpFile);
    } catch (e) {
      console.log(e);
    }
    try {
      inflationData = await this.parseCSV(inflationFile);
    } catch (e) {
      console.log(e);
    }
    if (gdpData?.length >= 1 && inflationData?.length >= 1) {
      this.gdpChartOpts.xaxis.categories = gdpData[0]; //header
      this.gdpChartOpts.series[0].data = gdpData[1]; // gdp-data
      this.gdpChartOpts.series[1].data = inflationData[1]; // inflation-data
      this.gdpChartOpts.title.text = this.getRegionText();
      this.gdpChart = Object.assign({}, this.gdpChartOpts);
    }
  }

  parseCSV(filename): Promise<any> {
    return new Promise((resolve, reject) => {
      const regionText = this.getRegionText();
      console.log("Region -> ", regionText);
      const valueToMatch = regionText;

      this.http.get(filename, { responseType: 'text' })
        .subscribe(data => {
          Papa.parse(data, {
            complete: (results) => {
              const csvData = results.data;
              let headerRow = csvData[0];
              let matchedRow = csvData.find(row => row[0] && row[0].trim() === valueToMatch); // Assuming the country_name column is the first column (index 0)  

              if (headerRow && matchedRow) {
                headerRow = headerRow.slice(32);
                matchedRow = matchedRow.slice(32);
                console.log('Header Row:', headerRow);
                console.log('Matched Row:', matchedRow);
                resolve([headerRow, matchedRow]);
              } else {
                reject(new Error('Matching row not found.'));
              }
            }
          });
        }, error => {
          reject(error);
        });
    });
  }

  generateCSV() {
    let data = Object.assign([], this.newsData);
    const csv = Papa.unparse([['#', 'title', 'description'], ...data.map((news, index) => [index + 1, news.title, news.description])]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.getRegionText()}-${this.topicSelected}-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return csv;
  }

  ngAfterViewInit() {
    // Access the wordCloudContainer element here  
    if (this.wordCloudContainer && this.wordData.length > 0) {
      this.drawWordChart();
    }
  }

  generateInsights(csv) {
    this.loadingService.present('insights', 'Generating insights...');
    this.isLoadingInsights = true;
    const headers = new HttpHeaders({
      'api-key': environment.genaiApiKey,
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    let industryPrompt = this.industrySelected ? `for a ${this.industrySelected} on ${this.topicSelected} ` : `for a ${this.topicSelected} `
    const content = {
      "messages": [
        {
          "role": "system",
          "content": "As an AI Chat bot understand the prompt and analyse the news provided along with GDP Growth and Inflation rate and provide the insights"
        },
        {
          "role": "user",
          "content": csv
        },
        {
          "role": "user",
          "content": `GDP Growth and Inflation rate by years as follows, Years:${this.gdpChartOpts.xaxis.categories}, GDP Growth:${this.gdpChartOpts.series[0].data} Inflation Rate:${this.gdpChartOpts.series[1].data}`
        },
        {
          "role": "user",
          "content": `Based on an analysis of political stability, economic stability, and labor movements in ${this.getRegionText()}, determine whether it would be a viable decision ${industryPrompt} in ${this.getRegionText()}. Provide reasons for your answer and suggest any potential risks or challenges the company may face in terms of political stability: economic stability: by considering factors such as GDP growth: income inequality: and the informal labor market: labor movements, recommendations and overall score in the format of ?/100`
        },
      ],
      "max_tokens": 800,
      "temperature": 0.7,
      "top_p": 0.95
    };
    this.http.post(environment.genaiApiUrl, content, options)
      .subscribe((data: any) => {
        // Handle the success response  
        this.loadingService.dismiss('insights');
        console.log(data);
        this.isLoadingInsights = false;
        if (data && data.choices && data.choices.length > 0) {
          let res = data.choices[0].message.content;
          res = res.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          res = res.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
          res = res.replace(/(\d+\.)\s(.*?)/g, "<strong>$1</strong> $2");
          res = res.replace(/(.*:)/g, "<b>$1</b>");

          this.globalInsights = res.replace(/\n/g, "<br>");
        }
      }, (error) => {
        // Handle the error response  
        console.log(error);
        this.isLoadingInsights = false;
        this.loadingService.dismiss('insights');
      });
  }

  prepareDocs(csv) {
    let docs = [];
    let allNews = Object.assign([], csv);
    if (allNews.length > 11) {
      allNews = allNews.slice(1, 11);
    } else {
      allNews = allNews;
    }
    allNews.forEach((news, index) => {
      docs.push({
        id: index,
        language: 'en',
        text: news.title + " - " + news.description
      });
    });
    return docs;
  }

  generateSentiments(csv) {
    // this.loadingService.present('sentiments', 'Generating sentiments...');
    let docs = this.prepareDocs(csv);
    this.isLoadingSentmts = true;

    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.langServiceAPIKey,
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const content = {
      "kind": "SentimentAnalysis",
      "parameters": {
        "modelVersion": "latest"
      },
      "analysisInput": {
        "documents": docs
      }
    }
    console.log("Docs", content);
    const url = environment.langServiceAPIUrl + 'language/:analyze-text?api-version=2023-04-15-preview';
    this.http.post(url, content, options)
      .subscribe((response: any) => {
        // Handle the success response  
        // this.loadingService.dismiss('sentiments');
        console.log(response);
        this.isLoadingSentmts = false;
        if (response && response.results && response.results.documents) {
          const documents = response.results.documents;
          documents.forEach((document) => {
            const sentiment = document.sentiment;
            if (sentiment === 'positive') {
              this.positiveCount++;
            } else if (sentiment === 'negative') {
              this.negativeCount++;
            } else if (sentiment === 'neutral') {
              this.neutralCount++;
            }
          });
          let data = [this.positiveCount, this.neutralCount, this.negativeCount];
          this.sentimentChart = this.sentimentChartOpts;
          this.sentimentChartOpts.series[0].data = data;
        }
      }, (error) => {
        // Handle the error response  
        console.log(error);
        this.isLoadingSentmts = false;
        // this.loadingService.dismiss('sentiments');
      });
  }

  generateKeyPhrases(csv) {
    let docs = this.prepareDocs(csv);
    this.isLoadingKeyph = true;
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.langServiceAPIKey,
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const content = {
      "kind": "KeyPhraseExtraction",
      "parameters": {
        "modelVersion": "latest"
      },
      "analysisInput": {
        "documents": docs
      }
    }
    console.log("keyphrase Docs", content);
    const url = environment.langServiceAPIUrl + 'language/:analyze-text?api-version=2023-04-15-preview';
    this.http.post(url, content, options)
      .subscribe((data: any) => {
        // Handle the success response  
        // this.loadingService.dismiss('keyphrase');
        console.log(data);
        this.isLoadingKeyph = false;
        if (data && data.results && data.results.documents) {
          const documents = data.results.documents;
          documents.forEach((document) => {
            const keyPhrases = document.keyPhrases;
            this.keyPhrases.push(...keyPhrases);
          });
          this.wordData = [];
          this.keyPhrases.forEach((phrase) => {
            this.wordData.push({ text: phrase, size: Math.floor(Math.random() * (16 - 10) + 10), value: Math.floor(Math.random() * (20 - 10) + 10) });
          });
          console.log('word data', this.wordData);
          this.drawWordChart();
        }
      }, (error) => {
        // Handle the error response  
        console.log(error);
        this.isLoadingKeyph = false;
      });
  }

  getBingRequestByTopic(topic) {
    const params = { 'q': topic, 'mkt': this.regionSelected, 'count': 50 } // 'freshness': `${this.fromDate}`
    const headers = { 'Ocp-Apim-Subscription-Key': environment.bingAPIKey }
    const options = { headers: headers, params: params };
    const request = this.http.get(environment.bingAPIUrl, options).pipe(
      catchError((error) => {
        console.error('Bing request failed:', error);
        return of(null); // Return a default value or null for the failed request  
      })
    );
    return request;
  }

  getNewsRequestByTopic(topic) {
    const q = `${topic}-in-${this.getRegionText()}`;
    const params = { 'q': q, 'apiKey': environment.newsAPIKey, searchIn: 'title,description' }
    const options = { params: params };
    const request = this.http.get(environment.newsAPIUrl, options).pipe(
      catchError((error) => {
        console.error('News API request failed:', error);
        return of(null); // Return a default value or null for the failed request  
      })
    );
    return request;
  }
  getGlobalMediaData() {
    this.loadingService.present('news', 'Getting global media data...');
    let topicBingReq, topicReq;
    let arrRequests = [];

    if (this.search?.length > 0) {
      topicBingReq = this.getBingRequestByTopic(this.search);
      topicReq = this.getNewsRequestByTopic(this.search);
      arrRequests = [topicBingReq, topicReq];
    }
    const polStabilityBingReq = this.getBingRequestByTopic('debates');
    const polStabilityReq = this.getNewsRequestByTopic('debates');
    const econStabilityBingReq = this.getBingRequestByTopic('economics');
    const econStabilityReq = this.getNewsRequestByTopic('economics');
    const labourMovBingReq = this.getBingRequestByTopic('employment');
    const labourMovReq = this.getNewsRequestByTopic('employment');

    arrRequests = arrRequests.concat([polStabilityBingReq, polStabilityReq, econStabilityBingReq, econStabilityReq, labourMovBingReq, labourMovBingReq]);

    // const twitterParams = { 'query': this.search }
    // const twitterHeaders = {
    //   'X-RapidAPI-Key': environment.twitterAPIKey,
    //   'X-RapidAPI-Host': environment.twitterAPIHost
    // }
    // const twitterOptions = { headers: twitterHeaders, params: twitterParams };
    // const twitterReq = this.http.get(environment.twitterAPIUrl, twitterOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('Twitter request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    // const redditParams = { 'query': this.search }
    // const redditHeaders = {
    //   'X-RapidAPI-Key': environment.redditAPIKey,
    //   'X-RapidAPI-Host': environment.redditHost
    // }
    // const redditOptions = { headers: redditHeaders, params: redditParams };
    // const redditReq = this.http.get(environment.redditAPIUrl, redditOptions).pipe(
    //   catchError((error) => {
    //     console.error('linkedin request failed:', error);
    //     return of(null); // Return a default value or null for the failed request  
    //   })
    // );

    // const instaParams = { 'query': this.search }
    // const instaHeaders = {
    //   'X-RapidAPI-Key': environment.instagramAPIKey,
    //   'X-RapidAPI-Host': environment.instagramAPIHost
    // }
    // const instaOptions = { headers: instaHeaders, params: instaParams };
    // const instaReq = this.http.get(environment.instagramAPIUrl, instaOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('Instagram request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    // const linkedInParams = { 'query': this.search }
    // const linkedInHeaders = {
    //   'X-RapidAPI-Key': environment.linkedInAPIKey,
    //   'X-RapidAPI-Host': environment.linkedInHost
    // }
    // const linkedInOptions = { headers: linkedInHeaders, params: linkedInParams };
    // const linkedInReq = this.http.get(environment.linkedInAPIUrl, linkedInOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('linkedin request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    forkJoin(arrRequests).subscribe(
      (responses) => {
        this.loadingService.dismiss('news');
        this.processResponses(responses);
        if (this.newsData && this.newsData.length > 0) {
          let csv = this.generateCSV();
          this.generateInsights(csv);
          this.generateKeyPhrases(this.newsData);
          this.generateSentiments(this.newsData);
        } else {
          this.alertService.presentAlert('Search Term Not Found', 'No data found for the given search term and region. Try with a different search term or region');
        }
      },
      (error) => {
        this.loadingService.dismiss('news');
        // This block will not be executed unless all requests fail  
        console.error('Error:', error);
      }
    );
  }

  processResponses(responses) {
    this.newsData = [];

    responses.forEach(response => {
      if (response !== null && response?.value || response?.articles) {
        let articles = response.value || response.articles;
        let arr = articles.map((news) => {
          let title = news.name || news.title;
          return {
            title: title === 'string' ? title.replace(/[^\w\s]/gi, '') : title,
            description: news.description === 'string' ? news.description.replace(/[^\w\s]/gi, '') : news.description
          }
        });
        this.newsData = this.newsData.concat(arr);
      }
    });
    this.newsData = this.newsData.filter(record => record && !record.title?.includes("[Removed]") && !record.description?.includes("[Removed]"));

    // //twitter posts
    // if(responses[1] && responses[1].timeline) {
    //   let posts = responses[1].timeline;
    //   let arr = posts.map((post) => post.text)
    //   this.newsData = this.newsData.concat(arr);
    //   series.push({x: 'Twitter', y: arr.length});
    // } else {
    //   series.push({x: 'Twitter', y: 0});
    // }

    // //reddit posts
    // if(responses[2] && responses[2].data) {
    //   let posts = responses[2].data;
    //   let arr = posts.map((post) => post.title)
    //   this.newsData = this.newsData.concat(arr);
    //   series.push({x: 'Reddit', y: arr.length});
    // } else {
    //   series.push({x: 'Reddit', y: 0});
    // }

    // //linkedin posts
    // if(responses[3] && responses[3].data) {
    //   let posts = responses[3].data;
    //   let arr = posts.map((post) => post.text)
    //   this.newsData.concat(arr);
    // }
  }
  getRegionText() {
    if (this.regionSelected)
      return this.regions.filter(region => region.key === this.regionSelected)[0].value;
    else '';
  }

  getRegions() {
    let url = "https://restcountries.com/v3.1/all?fields=cca2,name";
    this.httpService.httpGetApi(url).subscribe(res => {
      res.forEach(country => this.regions.push({ "key": country.cca2, "value": country.name.common }));
      this.regions.sort((a, b) => a.value.localeCompare(b.value));
      console.log(this.regions);
    }, err => {
      console.error('Error:', err);
    });
  }

  getIndustries() {
    let url = "assets/json/industries.json";
    this.httpService.httpGetApi(url).subscribe(res => {
      this.industries = res;
      this.industries.sort((a, b) => a.sortOrder - b.sortOrder);
    }, err => {
      console.error('Error:', err);
    });
  }

  getTopics() {
    if (localStorage.getItem('topics')) {
      this.topics = JSON.parse(localStorage.getItem('topics'));
      this.topics.sort((a, b) => a.sortOrder - b.industry);
      console.log("from localstorage");
    } else {
      let url = "assets/json/topics.json";
      this.httpService.httpGetApi(url).subscribe(res => {
        this.topics = res;
        localStorage.setItem('topics', JSON.stringify(this.topics));
        this.topics.sort((a, b) => a.sortOrder - b.industry);
        console.log("from json");
      }, err => {
        console.error('Error:', err);
      });
    }
  }

  async onAddTopic() {
    const modal = await this.modalCtrl.create({
      component: AddTopicPage,
      cssClass: 'auto-height',
      componentProps: {
        topics: this.topics
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data) {
      this.getTopics();
    }
  }

  async onKnowMore() {
    const modal = await this.modalCtrl.create({
      component: TopicInfoPage,
      cssClass: 'topic-info-modal',
      componentProps: {
        topics: this.topics
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
  getFileName() {
    return this.getRegionText() + "_" + this.topicSelected + Date.now() + ".pdf";
  }
  onExport() {
    this.exporting = true;
    setTimeout(() => {
      var data = document.getElementById('htmlContent');
      html2canvas(data).then((canvas: any) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
          doc.save(this.getFileName());
          this.exporting = false;
      });
    }, 1000);
  }
}
