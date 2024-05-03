import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppConfig } from './app-config';
import { EventService } from 'src/app/services/event-service';

declare let cordova: any;
declare var window;

@Injectable()
export class Utils {
  onDevice: boolean;
  public browserRefresh: boolean;

  addNSecondsDelay = (n) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, n * 1000);
    });
  };

  constructor(
    private platform: Platform,
    public appConfig: AppConfig,
    public eventService: EventService
  ) {
    this.onDevice = this.platform.is('cordova');
    this.showLog('Window ', window);
  }

  loadEnvironmentVars(envVars) {
    this.appConfig.loadEnvironmentVars(envVars);
  }

  showLog(message: string, value?: any) {
    if (message === '') {
      message = 'Log';
    }
    if (this.appConfig.isDebugLoggerEnabled) {
      try {
        console.log(message + ' >>> ' + JSON.stringify(value));
      } catch (e) {
        console.log('Error in log');
      }
    }
  }
  showAlert(message: string, value: any) {
    if (message === '') {
      message = 'Log';
    }
    if (this.appConfig.isDebugLoggerEnabled) {
      console.log(message + ' >>> ' + JSON.stringify(value));
      alert(message + ' >>> ' + JSON.stringify(value));
    }
  }
  isBrowser() {
    if (window.location.port === '8100') {
      return true;
    } else {
      return false;
    }
  }

  getListOfResources(obj) {
    return obj && obj.listOfResources && obj.listOfResources.length > 0
      ? obj.listOfResources[0]
      : null;
  }

  capitalizeFirstLetter(string) {
    return string && string.length > 0
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : string;
  }

  callToPhone(number: string) {
    window.location = "tel:" + encodeURIComponent(number);
  }
}
