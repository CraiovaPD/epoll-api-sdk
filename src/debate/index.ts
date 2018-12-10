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

  /**
   * Get debate by id.
   */
  getDebateById (id: string) : Observable<IDebate<any>> {
    return this._http.get(`${this._settings.apiBaseUrl}/debate/${id}`, {});
  }

  /**
   * Add a new poll option.
   */
  addPollOption (params: {
    pollId: string,
    reason: string
  }) : Observable<any> {
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/option`, {
      body: {
        reason: params.reason
      }
    });
  }

  /**
   * Remove a poll option.
   */
  removePollOption (params: {
    pollId: string,
    optionId: string
  }) : Observable<any> {
    return this._http.delete(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/option/${params.optionId}`, {});
  }

  /**
   * Add a new poll attachment.
   */
  addPollAttachment (params: {
    pollId: string,
    formData: any
  }) : Observable<any> {
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/attachment`, {
      body: params.formData
    });
  }

  /**
   * Remove a poll attachment.
   */
  removePollAttachment (params: {
    pollId: string,
    attachmentId: string
  }) : Observable<any> {
    return this._http.delete(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/attachment/${params.attachmentId}`, {});
  }

  /**
   * Add a new poll vote.
   */
  addPollVote (params: {
    pollId: string,
    optionId: string
  }) : Observable<any> {
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/vote`, {
      body: {
        optionId: params.optionId
      }
    });
  }

}