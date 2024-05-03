import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Keys } from './constants/constant';
import { NavController, Platform } from '@ionic/angular';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType, InteractionType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Utils } from './utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  direction = 'ltr';
  subscription: Subscription;
  loggedIn: boolean = false;
  userInfo: any = null;

  title = '';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private navCtrl: NavController,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private zone: NgZone,
    public utils: Utils,
    private router: Router
  ) {
    this.initializeMsal();
  }

  ngOnInit() {
    if(localStorage.getItem(Keys.isLoggedIn) === "true") {
      this.navCtrl.navigateRoot('/dashboard');
    }
  }
  initializeMsal() {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      }, err=>{
        console.log("In progress *****************", err);
      });
      this.authService.handleRedirectObservable().subscribe();

    // tslint:disable-next-line:no-shadowed-variable
    this.utils.eventService.subscribe(this.utils.appConfig.forceLoginEvent, (data: any) => {
      this.utils.showLog('Inside subscribe method forceLoginEvent ', data);

      if (data === 'success') {
        this.loginRedirect();
      }
      else {
        this.utils.showLog('Inside error consition forceloginEvent', data);
      }
    });
  }

  saveScope1Token(result) {
    this.utils.showLog('saveScope1Token ->', JSON.stringify(result));
    // AuthToken is Graph Token
    this.utils.appConfig.authToken = result.accessToken;
    this.utils.appConfig.tokenExpiry = result.expiresOn;
  }

  saveScope2Token(result) {
    this.utils.showLog('saveScope2Token ->', JSON.stringify(result));
    this.utils.appConfig.idToken = result.idToken;
    this.processSigninResponse(result);
  }


  saveSnowScopeToken(result) {
    this.utils.showLog('saveSnowScopeToken ->', JSON.stringify(result));
    this.utils.appConfig.snowToken = result.accessToken;
  }

  processSigninResponse(result) {
    this.utils.showLog('Success ->', JSON.stringify(result));
    if (this.utils.isBrowser()) {
      this.utils.showLog('inside processSigninResponse isBrowser->', '');
      // AuthToken is Graph Token
      this.utils.appConfig.authToken = result.accessToken;
      this.utils.appConfig.tokenExpiry = result.expiresOn;
      this.utils.appConfig.idToken = result.idToken;
      this.utils.appConfig.snowToken = result.snowToken;
    }
    if (!this.utils.isBrowser()) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  processSigninError(err) {
    this.utils.showLog('Error ->', JSON.stringify(err));
    this.utils.showLog('error data load', err);
    this.router.navigate(['/login']);
  }  

//#region  - Msal Web Login
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount(){
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }
//#endregion - Msal Web Login

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
    this.subscription.unsubscribe();
  }
}
