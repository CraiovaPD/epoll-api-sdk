// import {Observable} from 'rxjs';

import {IHttpClient, ISettings} from '../index';

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
   *
   *
   * @returns {IUser}
   */
  // create (params: {
  //   phone?: string
  // }) : Observable<IUser> {
  //   return this._http.post(`${this._settings.apiBaseUrl}/user`, {
  //     params: {
  //       phone: params.phone ? encodeURIComponent(params.phone) : undefined
  //     }
  //   });
  // }
}
