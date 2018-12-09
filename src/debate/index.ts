import {Observable} from 'rxjs';

import {IHttpClient, ISettings} from '../index';

import {
  IDebate, IPollDebate, IDebatePollListItem
} from '../types/debates/IDebate';

/**
 * Class used for calling remote Debate API.
 *
 * @author Dragos Sebestin
 */
export class Debate {

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
   * Create a new poll.
   *
   * @param {title} - Title to be used when displaying the poll
   *
   * @returns {IDebate<IPollDebate>}
   */
  createNewPoll (params: {
    title: string
  }) : Observable<IDebate<IPollDebate>> {
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll`, {
      body: {
        title: params.title
      }
    });
  }

  /**
   * List existing polls.
   *
   * @returns {}
   */
  listPolls (params: {
    limit?: number
  }) : Observable<IDebatePollListItem[]> {
    return this._http.get(`${this._settings.apiBaseUrl}/debate/poll`, {
      params: {
        limit: String(params.limit)
      }
    });
  }

}
