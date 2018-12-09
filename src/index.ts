import {Observable} from 'rxjs';

import {User} from './user/index';
import {Debate} from './debate/index';
import {Session} from './session';

export {User as UsersAPI} from './user/index';
export {Debate as DebatesAPI} from './debate/index';

export interface IHttpRequestOptions {
  params?: {
    [key:string] : string | undefined
  },
  body?: {
    [key:string] : any | undefined
  },
  headers?: {
    [key:string] : string | undefined
  }
}

/**
 * Http client interface used for
 * performing HTTP requests in a unified matter.
 *
 * The SDK will need to be configured with an
 * instance of this interface in order to be able
 * to actually perform requests.
 */
export interface IHttpClient {
  get (url: string, options?: IHttpRequestOptions) : Observable<any>;
  post (url: string, options?: IHttpRequestOptions) : Observable<any>;
  put (url: string, options?: IHttpRequestOptions) : Observable<any>;
  delete (url: string, options?: IHttpRequestOptions) : Observable<any>;
  upload (method: string, url: string, options?: IHttpRequestOptions) : Observable<any>;
}

export interface IApiConfig {
  hostname: string,
  version: string
}

export interface ISettings {
  apiBaseUrl: string
}

export class EPollAPI {
  private _session: Session | null = null;
  private _http?: IHttpClient;
  private _settings?: ISettings

  /**
   * Set HTTP client library to be used
   * internally for making requests.
   */
  setHttpClient (client: IHttpClient) {
    this._http = client;
  }

  /**
   * Load API configuration.
   */
  loadConfig (cfg: IApiConfig) {
    this._settings = {
      apiBaseUrl: `${cfg.hostname}/api/${cfg.version}`
    };
  }

  /**
   * Start a new session.
   */
  startSession (token: string) {
    this._session = new Session(token);
  }

  /**
   * Terminate current session.
   */
  endSession () {
    this._session = null;
  }

  /**
   * Get active session.
   */
  getActiveSession () : Session {
    if (!this._session) {
      throw new Error(`API does not have an active session.`);
    }

    return this._session;
  }

  Users () : User {
    if (!this._http)
      throw 'SDK HTTP client not set.';
    if (!this._settings)
      throw 'SDK settings not set.';
    return new User(this._http, this._settings);
  }

  Debates () : Debate {
    if (!this._http)
      throw 'SDK HTTP client not set.';
    if (!this._settings)
      throw 'SDK settings not set.';
    return new Debate(this._http, this._settings);
  }
}

export default new EPollAPI();
