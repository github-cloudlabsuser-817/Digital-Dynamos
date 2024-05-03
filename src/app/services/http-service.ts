import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { AppConfig } from '../utils/app-config';
// import 'rxjs/add/observable/fromPromise';


/* tslint:disable */
@Injectable()
export class HttpService {

  authorization: string;
  headrdata;
  httpOptions: any = {};
  useLocalJSON = false;

  constructor(private httpAngular: HttpClient, private appConfig: AppConfig, private platform: Platform,
  ) {
    //console.log('HttpService Provider', 'Constructor');
    // this.setHeadersHttpAngular();
    // this.setHeadersHttpNative();
  }


  httpGetApi(url, query?, headers?): Observable<any> {
    return this.httpAngular.get(url)
      .pipe(timeout(40000))
      .pipe(map(res => res))
  }

  httpPutApi(url, query?, headers?): Observable<any> {
    return this.httpAngular.put(url, query);
  }


  // httpPostApi(url, postData, headers?): Observable<any> {
  //   if (url.includes("assets/json")) {
  //     this.showLog('platform rsponse', 'data');
  //     if (window.hasOwnProperty('cordova')) {
  //       this.showLog('platform data', 'httpresponse');
  //       return from(this.httpGetLocalOnDevice(url));
  //     }
  //     else {
  //       this.showLog('else condition of platform', 'httpGetApi');
  //       return this.httpAngular.post(url, this.httpOptions)
  //         .pipe(timeout(40000))
  //         .pipe(map(res => res));
  //     }

  //   }
  //   else {
  //     this.setHeadersHttpAngularAPI();
  //     this.showLog('http data', JSON.stringify(this.httpOptions));
  //     this.showLog('api call', url);
  //     return this.httpAngular.post(url, postData, headers || this.httpOptions)
  //       .pipe(timeout(40000))
  //       .pipe(map(res => res));
  //   }
  // }

  // httpPatchApi(url, postData): Observable<any> {
  //   if (url.includes("assets/json")) {
  //     this.showLog('platform rsponse', 'data');
  //     if (window.hasOwnProperty('cordova')) {
  //       this.showLog('platform data', 'httpresponse');
  //       return from(this.httpGetLocalOnDevice(url));
  //     }
  //     else {
  //       this.showLog('else condition of platform', 'httpGetApi');
  //       return this.httpAngular.patch(url, this.httpOptions)
  //         .pipe(timeout(40000))
  //         .pipe(map(res => res));
  //     }

  //   }
  //   else {
  //     this.setHeadersHttpAngularAPI();
  //     this.showLog('http data', JSON.stringify(this.httpOptions));
  //     this.showLog('api call', url);
  //     return this.httpAngular.patch(url, postData, this.httpOptions)
  //       .pipe(timeout(40000))
  //       .pipe(map(res => res));
  //   }
  // }

  // httpPutApi(url, postData): Observable<any> {
  //   if (url.includes("assets/json")) {
  //     this.showLog('platform rsponse', 'data');
  //     if (window.hasOwnProperty('cordova')) {
  //       this.showLog('platform data', 'httpresponse');
  //       return from(this.httpGetLocalOnDevice(url));
  //     }
  //     else {
  //       this.showLog('else condition of platform', 'httpGetApi');
  //       return this.httpAngular.put(url, this.httpOptions)
  //         .pipe(timeout(40000))
  //         .pipe(map(res => res));
  //     }

  //   }
  //   else {
  //     this.setHeadersHttpAngularAPI();
  //     this.showLog('http data', JSON.stringify(this.httpOptions));
  //     this.showLog('api call', url);
  //     return this.httpAngular.put(url, postData, this.httpOptions)
  //       .pipe(timeout(40000))
  //       .pipe(map(res => res));
  //   }
  // }

  // httpDeleteApi(url, headers?, body?): Observable<any> {
  //   this.showLog('platform', url);
  //   if (url.includes("assets/json")) {
  //     this.showLog('platform rsponse', 'data');
  //     if (window.hasOwnProperty('cordova')) {
  //       this.showLog('platform data', 'httpresponse');
  //       return from(this.httpGetLocalOnDevice(url));
  //     }
  //     else {
  //       this.showLog('else condition of platform', 'httpGetApi');
  //       return this.httpAngular.delete(url, this.httpOptions)
  //         .pipe(timeout(40000))
  //         .pipe(map(res => res));
  //     }
  //   }

  //   else {
  //     this.showLog('platform data', url);
  //     this.setHeadersHttpAngularAPI();
  //     if (headers && headers.responseType) {
  //       this.httpOptions.responseType = headers.responseType;
  //     }
  //     if (headers && headers === this.appConfig.requestType) {
  //       this.httpOptions = {};
  //     }
  //     if (body) {
  //       this.httpOptions.body = body;
  //     }
  //     return this.httpAngular.delete(url, this.httpOptions)
  //       .pipe(timeout(40000))
  //       .pipe(map(res => res));
  //   }

  //   // return this.httpAngular.delete(url, headers || this.httpOptions)
  //   //   .pipe(timeout(40000))
  //   //   .pipe(map(res => res));
  // }



  // setHeadersForLegalNotes() {
  //   this.headrdata = {
  //     "Content-Type": "application/json",
  //     "application-type": 'REST'
  //   };
  // }





  // httpGetLocalOnBrowser(url): Observable<any> {
  //   return this.httpAngular.get(url)
  //     .pipe(timeout(40000))
  //     .pipe(map(res => res));
  // }

  // httpGetLocalOnDevice(url): Promise<any> {
  //   // console.log('hettpGetLocal', url);
  //   return fetch(url).then(res => res.json());
  // }

  showLog(message: string, value: any) {
    if (message === '') {
      message = 'Log';
    }
    if (this.appConfig.isDebugLoggerEnabled) {
      console.log(message + ' >>> ' + JSON.stringify(value));
    }
  }



  // httpGetApiNew(url): Observable<any> {
  //   if (url.includes("assets/json")) {
  //     if (window.hasOwnProperty("cordova")) {
  //       return from(this.httpGetLocalOnDevice(url));
  //     } else {
  //       return this.httpAngular
  //         .get(url, this.httpOptions)
  //         .pipe(timeout(40000))
  //         .pipe(map((res) => res));
  //     }
  //   } else {
  //     this.setHeadersHttpAngularAPI();
  //     return this, this.httpAngular
  //       .get(url, this.httpOptions)
  //       .pipe(timeout(40000))
  //       .pipe(map((res) => res));
  //   }
  // }


  // setHeadersHttpAngularAPI() {
  //   // this.showLog('http access token', this.appConfig.authToken),
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.appConfig.idToken || localStorage.getItem('token'),
  //       // 'Authorization': 'test123'
  //       // 'x-api-key': this.appConfig.xAPIKey
  //     })
  //   };
  // }

  // setHeadersHttpNativeAPI() {
  //   // this.showLog('http access token', this.appConfig.authToken),
  //   this.headrdata = {
  //     'Content-Type': 'application/json'
  //     // 'Authorization': 'Bearer ' + this.appConfig.idToken,
  //     // 'graphToken': this.appConfig.authToken
  //   };
  // }

  // httpGetLocal(url): Observable<any> {
  //   return this.httpAngular
  //     .get(url)
  //     .pipe(timeout(60000))
  //     .pipe(map((res) => res));
  // }

  // httpFileUpload(url, file): Observable<any> {
  //   // Create form data
  //   const formData = new FormData();

  //   // Store form name as "file" with file data
  //   formData.append('file', file, file.name);

  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       //'x-api-key': this.appConfig.xAPIKey,
  //       'Authorization': this.appConfig.idToken || localStorage.getItem('token'),
  //       //'accept': 'application/json'
  //     })
  //   };

  //   return this.httpAngular.post(url, formData, this.httpOptions);
  // }
}
