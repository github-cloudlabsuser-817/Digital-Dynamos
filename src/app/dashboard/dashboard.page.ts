import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ConfigPage } from '../config/config.page';
import { LoadingService } from '../providers/loading.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { saveAs } from 'file-saver';  
import * as Papa from 'papaparse';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  regions = [
    {
      key: 'en-AR',
      value: 'Argentina',
    },
    {
      key: 'en-AU',
      value: 'Australia',
    },
    {
      key: 'de-AT',
      value: 'Austria',
    },
    {
      key: 'nl-BE',
      value: 'Belgium',
    },
    {
      key: 'fr-BE',
      value: 'Belgium',
    },
    {
      key: 'pt-BR',
      value: 'Brazil',
    },
    {
      key: 'en-CA',
      value: 'Canada',
    },
    {
      key: 'fr-CA',
      value: 'Canada',
    },
    {
      key: 'es-CL',
      value: 'Chile',
    },
    {
      key: 'zh-CN',
      value: 'China',
    },
    {
      key: 'da-DK',
      value: 'Denmark',
    },
    {
      key: 'fi-FI',
      value: 'Finland',
    },
    {
      key: 'fr-FR',
      value: 'France',
    },
    {
      key: 'de-DE',
      value: 'Germany',
    },
    {
      key: 'zh-HK',
      value: 'Hong Kong',
    },
    {
      key: 'en-IN',
      value: 'India',
    },
    {
      key: 'en-ID',
      value: 'Indonesia',
    },
    {
      key: 'it-IT',
      value: 'Italy',
    },
    {
      key: 'ja-JP',
      value: 'Japan',
    },
    {
      key: 'ko-KR',
      value: 'South Korea',
    },
    {
      key: 'en-MY',
      value: 'Malaysia',
    },
    {
      key: 'es-MX',
      value: 'Mexico',
    },
    {
      key: 'nl-NL',
      value: 'Netherlands',
    },
    {
      key: 'en-NZ',
      value: 'New Zealand',
    },
    {
      key: 'no-NO',
      value: 'Norway',
    },
    {
      key: 'pl-PL',
      value: 'Poland',
    },
    {
      key: 'en-PH',
      value: 'Philippines',
    },
    {
      key: 'ru-RU',
      value: 'Russia',
    },
    {
      key: 'en-ZA',
      value: 'South Africa',
    },
    {
      key: 'es-ES',
      value: 'Spain',
    },
    {
      key: 'sv-SE',
      value: 'Sweden',
    },
    {
      key: 'zh-TW',
      value: 'Taiwan',
    },
    {
      key: 'tr-TR',
      value: 'Turkey',
    },
    {
      key: 'en-GB',
      value: 'United Kingdom',
    },
    {
      key: 'en-US',
      value: 'United States',
    },
  ];

  topic: string;
  regionSelected: string;

  globalData: any;
  selectedFile: File; 
  
  // Chart objects
  occurrenceChart: any;
  occurrenceChartOpts = {
    series: [
      {
        name: "distibuted",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    colors: [
      "#00A3EE",
      "#1DA1F2",
      "#FEB019"
    ],
    plotOptions: {
      bar: {
        columnWidth: "30px",
        distributed: true
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        "Bing",
        "Twitter",
        "Reddit"
      ],
      labels: {
        style: {
          colors: [
            "#00A3EE",
            "#1DA1F2",
            "#FEB019"
          ],
          fontSize: "12px"
        }
      }
    }
  };
  globalInsights: string;
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private http: HttpClient
  ) {
    this.renderCharts();
  }

  renderCharts() {
    // this.chartOptions = {
    //   series: this.series,
    //   labels: this.labels,
    //   chart: {
    //     height: 270,
    //     type: 'pie'
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 380,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: 'bottom'
    //         }
    //       }
    //     }
    //   ]
    // };

    // this.lchartOptions = {
    //   series: this.lseries,
    //   chart: {
    //     type: 'line',
    //     height: 255
    //   },
    //   xaxis: {
    //     categories: this.lXLabels
    //   },
    //   yaxis: {
    //     title: {
    //       text: 'Value'
    //     }
    //   }
    // };

    // this.bchartOptions = {
    //   series: this.bseries,
    //   chart: {
    //     height: 250,
    //     type: 'bubble'
    //   },
    //   xaxis: {
    //     tickAmount: 5
    //   },
    //   yaxis: {
    //     tickAmount: 5
    //   }
    // };
    // this.occurrenceChartOpts.series[0].data = [23, 73, 12]
    // this.occurrenceChart = this.occurrenceChartOpts;
  }


  ngOnInit() {
    
  }

  async config() {
    const modal = await this.modalCtrl.create({
      component: ConfigPage
    });
    modal.present();
    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data?.data) {

      }
    });
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.navCtrl.navigateRoot('/login');
  }

  canAnalyse() {
    return this.regionSelected?.length > 0 && this.topic?.length > 0;
    // return this.topic?.length > 0;
  }

  analyse() {
    this.getGlobalMediaData();
  }

  handleFileInput(event: any) {  
    this.selectedFile = event.target.files[0] as File;
    const formData: FormData = new FormData();  
    formData.append('file', this.selectedFile, this.selectedFile.name);  
    
    const params = { 'query': 'can you analyse the market entry, product development and political stability from the data provided?' }
    const headers = {
      'openai-key': environment.promptAPIKey,
      'Content-Type': 'application/json'
    }
    const options = { headers: headers, params: params };

    this.http.post(environment.promptAPIUrl, formData, options).subscribe(
      (response) => {  
        console.log('CSV file uploaded successfully', response);  
      },  
      (error) => {  
        console.error('Error uploading CSV file:', error);  
      }  
    );  
    
  }

  uploadFile() {  
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;  
    fileInput.click();  
  }

  generateAndUploadCSV(): void {
    this.globalData.splice(0, 0, "Content");
    const csv = Papa.unparse(this.globalData.map((value) => [value]));

    console.log("csv", csv);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');  
    const url = URL.createObjectURL(blob);  
    link.setAttribute('href', url);  
    link.setAttribute('download', 'data.csv');  
    link.style.visibility = 'hidden';  
    document.body.appendChild(link);  
    link.click();  
    document.body.removeChild(link); 

    this.loadingService.present('insights', 'Generating insights...');
    const headers = new HttpHeaders({  
      'api-key': environment.genaiApiKey,
      'Content-Type': 'application/json'
    });  
    
    const options = { headers: headers };
    const content = {
        "messages": [
            {
                "role": "system",
                "content": "As an AI Chat bot understand the prompt and analyse the person or a product and provide me the insights"
            },
            {
                "role": "user",
                // "content": `As an AI chat bot understand the topic provided (Person or Company or Product or Industry) and analyse the content given and provide me the insights accordingly. Market Entry: Product Development: Public Relations: from the content below.`
                "content": `Based on an analysis of political stability, economic stability, and labor movements in ${this.regionSelected}, determine whether it would be a viable decision for a company to enter the market in ${this.regionSelected}. Provide reasons for your answer and suggest any potential risks or challenges the company may face in terms of political stability: economic stability: and labor movements`
            },
            {
              "role": "user",
              "content": csv
            }
        ],
        "max_tokens": 2000,
        "temperature": 0.01,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 0.95,
        "stop": null
    };
    this.http.post(environment.genaiApiUrl, content, options)  
      .subscribe((data:any) => {  
      // Handle the success response  
      this.loadingService.dismiss('insights');
      console.log(data);
      if(data && data.choices && data.choices.length > 0) {
        let res = data.choices[0].message.content;
        this.globalInsights = res.replace(/\n/g, "<br>");
      }
    }, (error) => {  
      // Handle the error response  
      console.log(error);  
      this.loadingService.dismiss('insights');
    });

    // const formData: FormData = new FormData();  
    // formData.append('file', blob, 'data.csv');  

    // this.http.post('your-upload-url', formData).subscribe(  
    //   (response) => {  
    //     console.log('CSV file uploaded successfully');  
    //   },  
    //   (error) => {  
    //     console.error('Error uploading CSV file:', error);  
    //   }  
    // );  
  }

  getGlobalMediaData() {
    this.loadingService.present('news');

    const bingParams = { 'q': this.topic, 'mkt': this.regionSelected, 'count': 200 }
    const bingHeaders = { 'Ocp-Apim-Subscription-Key': environment.bingAPIKey }
    const bingOptions = { headers: bingHeaders, params: bingParams };
    const bingRequest = this.http.get(environment.bingAPIUrl, bingOptions).pipe(  
      catchError((error) => {  
        console.error('Bing request failed:', error);  
        return of(null); // Return a default value or null for the failed request  
      })  
    );

    // const twitterParams = { 'query': this.topic }
    // const twitterHeaders = {
    //   'X-RapidAPI-Key': environment.twitterAPIKey,
    //   'X-RapidAPI-Host': environment.twitterAPIHost
    // }
    // const twitterOptions = { headers: twitterHeaders, params: twitterParams };
    // const twitterRequest = this.http.get(environment.twitterAPIUrl, twitterOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('Twitter request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    // const redditParams = { 'query': this.topic }
    // const redditHeaders = {
    //   'X-RapidAPI-Key': environment.redditAPIKey,
    //   'X-RapidAPI-Host': environment.redditHost
    // }
    // const redditOptions = { headers: redditHeaders, params: redditParams };
    // const redditRequest = this.http.get(environment.redditAPIUrl, redditOptions).pipe(
    //   catchError((error) => {
    //     console.error('linkedin request failed:', error);
    //     return of(null); // Return a default value or null for the failed request  
    //   })
    // );

    // const instaParams = { 'query': this.topic }
    // const instaHeaders = {
    //   'X-RapidAPI-Key': environment.instagramAPIKey,
    //   'X-RapidAPI-Host': environment.instagramAPIHost
    // }
    // const instaOptions = { headers: instaHeaders, params: instaParams };
    // const instaRequest = this.http.get(environment.instagramAPIUrl, instaOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('Instagram request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    // const linkedInParams = { 'query': this.topic }
    // const linkedInHeaders = {
    //   'X-RapidAPI-Key': environment.linkedInAPIKey,
    //   'X-RapidAPI-Host': environment.linkedInHost
    // }
    // const linkedInOptions = { headers: linkedInHeaders, params: linkedInParams };
    // const linkedInRequest = this.http.get(environment.linkedInAPIUrl, linkedInOptions).pipe(  
    //   catchError((error) => {  
    //     console.error('linkedin request failed:', error);  
    //     return of(null); // Return a default value or null for the failed request  
    //   })  
    // );

    forkJoin([
      bingRequest, 
      // twitterRequest, 
      // redditRequest,
      // instaRequest,
      // linkedInRequest,
    ]).subscribe(
      (responses) => {
        this.loadingService.dismiss('news');
        this.processResponses(responses);
        this.generateAndUploadCSV();
      },
      (error) => {
        this.loadingService.dismiss('news');
        // This block will not be executed unless all requests fail  
        console.error('Error:', error);
      }
    );
  }

  processResponses(responses) {
    const series = [];

    this.globalData = [];

    //bing news
    if(responses[0] && responses[0].value) {
      let bingnews = responses[0].value;
      let arr = bingnews.map((news) => news.description);
      this.globalData = arr;
      series.push({x: 'Bing', y: arr.length});
    } else {
      series.push({x: 'Bing', y: 0});
    }

    // //twitter posts
    // if(responses[1] && responses[1].timeline) {
    //   let posts = responses[1].timeline;
    //   let arr = posts.map((post) => post.text)
    //   this.globalData = this.globalData.concat(arr);
    //   series.push({x: 'Twitter', y: arr.length});
    // } else {
    //   series.push({x: 'Twitter', y: 0});
    // }

    // //reddit posts
    // if(responses[2] && responses[2].data) {
    //   let posts = responses[2].data;
    //   let arr = posts.map((post) => post.title)
    //   this.globalData = this.globalData.concat(arr);
    //   series.push({x: 'Reddit', y: arr.length});
    // } else {
    //   series.push({x: 'Reddit', y: 0});
    // }

    // //linkedin posts
    // if(responses[3] && responses[3].data) {
    //   let posts = responses[3].data;
    //   let arr = posts.map((post) => post.text)
    //   this.globalData.concat(arr);
    // }
    this.occurrenceChartOpts.series[0].data = series;
    this.occurrenceChart = this.occurrenceChartOpts;
  }
}
