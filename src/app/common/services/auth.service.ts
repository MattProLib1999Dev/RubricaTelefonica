import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, RedirectRequest, SilentRequest } from '@azure/msal-browser';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { Logger } from './logger.service';
import { Language } from '../models/language';
import { Roles } from '../enums/roles';
import { COMMON_CONFIG } from '@/common-config';
import { UtentiOutput, Ruoli } from '@/dto/utenti/utentiOutput';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private msalService = inject(MsalService);
  private logger = inject(Logger);
  private commonConfig = inject(COMMON_CONFIG);


  public checkAndSetActiveAccount(): void {

    const allAccounts = this.msalService.instance.getAllAccounts();
    const activeAccount = this.msalService.instance.getActiveAccount();

    this.logger.info(`Account status - Total: ${allAccounts.length}, Active: ${activeAccount?.username || 'None'}`);

    if (!activeAccount && allAccounts.length > 0) {
      this.logger.info(`Setting active account to: ${allAccounts[0].username}`);
      this.msalService.instance.setActiveAccount(allAccounts[0]);
      return;
    }

    if (allAccounts.length === 0) {
      this.logger.warn('No accounts found in MSAL cache');
      this.handleNoAccounts();
    } else {
      this.logger.info(`Active account confirmed: ${activeAccount?.username}`);
    }
  }

  private handleNoAccounts(): void {
    const currentUrl = window.location.href;
    const isLoginPage = currentUrl.includes('/login');
    const isMsalCallback = currentUrl.includes('code=') || currentUrl.includes('error=') || currentUrl.includes('state=');

    this.logger.info(`URL Analysis - Login page: ${isLoginPage}, MSAL callback: ${isMsalCallback}`);

    if (isMsalCallback) {
      this.logger.info('MSAL callback detected, waiting for redirect completion...');
      return;
    }

    if (isLoginPage) {
      this.logger.info('On login page, user must initiate login manually');
      return;
    }

    this.logger.info('No accounts found, starting automatic login...');
    this.login(this.commonConfig.azureConfig.msalGuardConfig.authRequest.scopes);
  }

  getToken(scopes: string[] = this.commonConfig.azureConfig.msalGuardConfig.authRequest.scopes): Observable<string | null> {
    const account = this.msalService.instance.getActiveAccount();

    if (!account) {
      this.logger.warn('No active MSAL account found for token acquisition');

      this.checkAndSetActiveAccount();
      const retryAccount = this.msalService.instance.getActiveAccount();

      if (!retryAccount) {
        this.logger.error('Still no active account after retry');
        return of(null);
      } else {
        this.logger.info('Found account after retry, proceeding with token acquisition');
      }
    }

    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      return of(null);
    }

    const silentRequest: SilentRequest = {
      scopes: scopes,
      account: activeAccount
    };

    this.logger.info(`Acquiring token for scopes: ${scopes.join(', ')}`);

    return from(this.msalService.acquireTokenSilent(silentRequest)).pipe(
      switchMap((result: AuthenticationResult) => {
        this.logger.info('Token acquired successfully', {
          tokenType: result.tokenType,
          expiresOn: result.expiresOn
        });
        return of(result.accessToken);
      }),
      catchError((error) => {
        this.logger.error('Token acquisition failed:', error);

        // Richiedi login interattivo se necessario
        if (error.errorCode === 'interaction_required' ||
          error.errorCode === 'consent_required' ||
          error.errorCode === 'login_required') {
          this.logger.info('Interactive login required, redirecting...');
          this.login(scopes);
        }

        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    try {
      const isAuth = this.msalService.instance.getActiveAccount() !== null;
      this.logger.debug(`isAuthenticated: ${isAuth}`);
      return isAuth;
    } catch (error) {
      this.logger.debug('isAuthenticated: false (MSAL not initialized yet)');
      return false;
    }
  }

  getActiveAccount(): AccountInfo | null {
    try {
      return this.msalService.instance.getActiveAccount();
    } catch (error) {
      this.logger.debug('getActiveAccount: null (MSAL not initialized yet)');
      return null;
    }
  }

  getUserName(): string | null {
    const account = this.getActiveAccount();
    return account?.name || account?.username || null;
  }


  getUserEmail(): string | null {
    const account = this.getActiveAccount();
    return account?.username || null;
  }

  login(scopes: string[] = this.commonConfig.azureConfig.msalGuardConfig.authRequest.scopes): void {
    this.logger.info(`Initiating login with scopes: ${scopes.join(', ')}`);
    this.msalService.loginRedirect({
      scopes: scopes
    });
  }

  logout(): void {
    this.logger.info('Logging out user');
    this.msalService.logoutRedirect();
  }

  loginRedirect(request: RedirectRequest): void {
    this.msalService.loginRedirect(request);
  }

  acquireTokenSilent(request: SilentRequest): Observable<AuthenticationResult> {
    return this.msalService.acquireTokenSilent(request);
  }


  //GESTIONE UTENZA SHUNTING

  public get shUser(): UtentiOutput | null {

    const userStr: string | null = window.localStorage.getItem("SH_USER");

    let user: UtentiOutput | null = null;

    if (!!userStr?.length) {
      user = JSON.parse(atob(userStr))
    }

    return user;
  }

  public set shUser(user: UtentiOutput) {
    if(!!user && Object.keys(user).length > 0) {
      window.localStorage.setItem("SH_USER", btoa(JSON.stringify(user)));
    }
  }

  public get shLang(): string | undefined {

    const userStr: string | null = window.localStorage.getItem("SH_USER");

    let user: UtentiOutput | null = null;

    if (!!userStr?.length) {
      user = JSON.parse(atob(userStr))
    }

    let lang = Language.IT.toString();

    if(!!user?.lingua?.length && Object.entries(Language).find(([key, val]) => val === user?.lingua)) {
      lang = user.lingua;
    }

    return lang;
  }


  public get userRoles(): Ruoli[] {

    let roles: Ruoli[] = new Array<Ruoli>;

    if (!!this.shUser) {
      roles = this.shUser.ruoli;
    }

    return roles;
  }

  public clearShUser() {
    window.localStorage.removeItem("SH_USER");
  }

  public hasRoles(roles: Roles[]) {
    return this.userRoles?.some(ruolo => roles.indexOf(ruolo.id) >= 0);
  }
}
