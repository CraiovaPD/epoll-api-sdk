// import {Observable} from 'rxjs';

import {IHttpClient, ISettings} from '../index';
import { Observable } from 'rxjs';
import NovabookerAPI from '../index';

// types
import { IUser } from '../types/users/IUser';
import { ILoginResponse } from '../types/users/ILoginResponse';

/**
 * Class used for calling remote User API.
 *
 * @author Dragos Sebestin
 */
export class User {

  /**
   * Class constructor.
   */
  constructor (
    private _http: IHttpClient,
    private _settings: ISettings
  ) {
    this._http; this._settings;
  }

  /**
   * Register a new user account.
   *
   * @returns {ILoginResponse}
   */
  register (params: {
    grantType: String,
    clientId: String,
    clientSecret?: string,
    state: string,

    accountKitCode: string,
    firstname: string,
    lastname?: string
  }) : Observable<ILoginResponse> {
    return this._http.post(`${this._settings.apiBaseUrl}/user/register`, {
      body: {
        grantType: params.grantType,
        clientId: params.clientId,
        clientSecret: params.clientSecret,
        state: params.state,
        accountKitCode: params.accountKitCode,
        firstname: params.firstname,
        lastname: params.lastname
      }
    });
  }

  /**
   * Get user profile for current session.
   *
   * @returns {IUser}
   */
  getMyUserProfile () : Observable<IUser> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.get(`${this._settings.apiBaseUrl}/user/me`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
    });
  }

  /**
   * Authenticate user using an AK code.
   *
   * @returns {ILoginResponse}
   */
  authenticate (params: {
    grantType: String,
    clientId: String,
    clientSecret?: string,
    state: string,
    accountKitCode: string
  }) : Observable<ILoginResponse> {
    return this._http.post(`${this._settings.apiBaseUrl}/user/oauth`, {
      body: {
        grantType: params.grantType,
        clientId: params.clientId,
        clientSecret: params.clientSecret,
        state: params.state,
        accountKitCode: params.accountKitCode
      }
    });
  }
}
