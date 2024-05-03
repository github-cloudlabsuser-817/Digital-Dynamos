
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


@Injectable()
export class AppConfig {
  isRuuningOnMobile = false;

  onDevice: boolean;
  appVersion: string;
  appName: string;
  bundleId: string;
  versionPostfix: string;
  appEnvironment: string;
  appNoticesBaseUrl: string;
  AllLinkArray = [];
  AllLinkImageArray = [];
  forceLoginEvent = 'forceLoginEvent';
  proceedRefreshMeetings = 'proceedRefreshMeetings';
  
  alphatbetPattern = /^[a-zA-Z ]+$/;
  alphaNumericPattern = /^[a-zA-Z0-9 ]+$/;
  numericPattern = /^[0-9]+$/;
  decimalPattern = /^[0-9.]+$/;
  isKeyUser: boolean = false;
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  urlRegexString = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  none = 'none';
  languageCode = '';
  countryCode = '';
  legalCloudUrl = '';

  // Token
  authToken = '';
  idToken = '';
  snowToken = '';
  tokenExpiry = '';
  timeZone = '';

  userNameDemo = ""
  lastNameDemo = ""
  passwordDemo = ""
  emailDemo = ""
  isOverrideLogin = false
  isOverrideRegister = false
  requestType = "Gigya";

  // Env Variables
  isDebugLoggerEnabled = true;
  useLocalJSON = false;
  toastPosition = 'top';
  toastDurationSuccess = 5000;
  toastDurationError = 7000;
  toastClassNameSuccess = 'dark';
  toastClassNameError = 'danger';
  loadingContent = "";
  getSyncDataAtLogin: any;
  environmentFileURL = 'assets/json/env-config.json';

  //creating db content
  dbName = "starter-kit.db";

  constructor(private platform: Platform,
    // public utils: Utils
  ) {
    this.onDevice = this.platform.is('android') && this.platform.is('ios');
  }



  loadEnvironmentVars(envVars) {
    this.bundleId = envVars.bundle_id;
    this.appEnvironment = envVars.apns_env;
    this.appVersion = envVars.app_version;
    this.appName = envVars.app_name;
    this.isDebugLoggerEnabled = envVars.isDebugLoggerEnabled;
    this.printEnvVariables();
  }

  printEnvVariables() {
    this.showLog('this.onDevice', this.onDevice);
    this.showLog('this.appVersion', this.appVersion);
    this.showLog('this.appName', this.appName);
    this.showLog('this.versionPostfix', this.versionPostfix);
    this.showLog('this.bundleId', this.bundleId);
    this.showLog('this.appEnvironment', this.appEnvironment);
    this.showLog('this.isDebugLoggerEnabled', this.isDebugLoggerEnabled);

    this.showLog('this.userNameDemo', this.userNameDemo);
    this.showLog('this.passwordDemo', this.passwordDemo);
    this.showLog('this.emailDemo', this.emailDemo);
    this.showLog('this.isOverrideLogin', this.isOverrideLogin);
    this.showLog('this.isOverrideRegister', this.isOverrideRegister);
  }

  getAllLegalNotesLinks() {
    this.AllLinkArray = [];

    //QA leagl notes url

    const AllLinkArrayObj = {
      allLinkArray: [
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/about_the_developer/predima_aboutthedeveloper_en.html',
          filename: 'aboutthedeveloper_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/about_the_developer/'
        },
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/conditions_of_use/predima_conditionsofuse_en.html',
          filename: 'conditionsofuse_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/conditions_of_use/'
        },
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/data_privacy_statement/predima_dataprivacystatement_en.html',
          filename: 'dataprivacystatement_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/data_privacy_statement/'
        },
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/imprint/predima_imprint_en.html',
          filename: 'imprint_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/imprint/'
        },
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/support/predima_support_en.html',
          filename: 'support_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/support/'
        },
        {
          url: 'https://stpredimaqa.blob.core.windows.net/predimafiles/open_source_libraries/predima_opensourcelibraries_en.html',
          filename: 'opensourcelibraries_en.html',
          imageUrl: 'https://stpredimaqa.blob.core.windows.net/predimafiles/open_source_libraries/'
        }
      ]
    };

    this.AllLinkArray.push(AllLinkArrayObj);
  }

  showLog(message: string, value: any) {
    if (message === '') {
      message = 'Log';
    }
    if (this.isDebugLoggerEnabled) {
      console.log(message + ' >>> ' + JSON.stringify(value));
    }
  }
}
