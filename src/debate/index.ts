import {Observable} from 'rxjs';

import NovabookerAPI from '../index';
import {IHttpClient, ISettings} from '../index';

import {
  IDebate, IPollDebate, IDebatePollListItem, DebateState,
  IDebateAnouncementListItem
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
    title: string,
    content: string
  }) : Observable<IDebate<IPollDebate>> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
      body: {
        title: params.title,
        content: params.content
      }
    });
  }

  /**
   * List existing polls.
   *
   * @returns {}
   */
  listPolls (params: {
    fromId?: string,
    state?: {
      from: DebateState,
      to: DebateState
    },
    limit?: number
  }) : Observable<IDebatePollListItem[]> {
    let query = {
      limit: String(params.limit)
    } as any;
    if (params.state) {
      query.stateFrom = String(params.state.from);
      query.stateTo = String(params.state.to);
    }
    if (params.fromId) {
      query.fromId = String(params.fromId);
    }
    return this._http.get(`${this._settings.apiBaseUrl}/debate/poll`, {
      params: query
    });
  }

  /**
   * Get debate by id.
   */
  getDebateById (id: string) : Observable<IDebate<any>> {
    return this._http.get(`${this._settings.apiBaseUrl}/debate/${id}`, {});
  }

  /**
   * Update a debate's status.
   */
  updateDebateState (params: {
    debateId: string,
    newState: DebateState
  }) : Observable<IDebate<any>> {
    return this._http.put(`${this._settings.apiBaseUrl}/debate/${params.debateId}/state`, {
      body: {
        state: String(params.newState)
      }
    });
  }

  /**
   * Add a new poll option.
   */
  addPollOption (params: {
    pollId: string,
    reason: string
  }) : Observable<any> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/option`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
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
    let session = NovabookerAPI.getActiveSession();
    return this._http.delete(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/option/${params.optionId}`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
    });
  }

  /**
   * Add a new poll attachment.
   */
  addPollAttachment (params: {
    pollId: string,
    formData: any
  }) : Observable<any> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/attachment`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
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
    let session = NovabookerAPI.getActiveSession();
    return this._http.delete(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/attachment/${params.attachmentId}`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
    });
  }

  /**
   * Add a new poll vote.
   */
  addPollVote (params: {
    pollId: string,
    optionId: string
  }) : Observable<any> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/poll/${params.pollId}/vote`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
      body: {
        optionId: params.optionId
      }
    });
  }

  /**
   * Update a debate.
   */
  updateDebate (params: {
    debateId: string,
    newTitle: string,
    newContent: string
  }) : Observable<IDebate<any>> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.put(`${this._settings.apiBaseUrl}/debate/${params.debateId}`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
      body: {
        title: params.newTitle,
        content: params.newContent
      }
    });
  }

  /**
   * Create a new anouncement.
   *
   * @param {title} - Title to be used when displaying the poll
   * @param {content} - Full description of the anouncement
   *
   * @returns {IDebate<IAnouncementDebate>}
   */
  createNewAnouncement (params: {
    title: string,
    content: string
  }) : Observable<IDebate<IPollDebate>> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/anouncement`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
      body: {
        title: params.title,
        content: params.content
      }
    });
  }

  /**
   * Add a new anouncement attachment.
   */
  addAnouncementAttachment (params: {
    anouncementId: string,
    formData: any
  }) : Observable<any> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.post(`${this._settings.apiBaseUrl}/debate/anouncement/${params.anouncementId}/attachment`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
      body: params.formData
    });
  }

  /**
   * Remove an anouncement attachment.
   */
  removeAnouncementAttachment (params: {
    anouncementId: string,
    attachmentId: string
  }) : Observable<any> {
    let session = NovabookerAPI.getActiveSession();
    return this._http.delete(`${this._settings.apiBaseUrl}/debate/anouncement/${params.anouncementId}/attachment/${params.attachmentId}`, {
      headers: {
        Authorization: `${session.tokenType} ${session.token}`
      },
    });
  }

  /**
   * List existing anouncements.
   *
   * @returns {}
   */
  listAnouncements (params: {
    fromId?: string,
    state?: {
      from: DebateState,
      to: DebateState
    },
    limit?: number
  }) : Observable<IDebateAnouncementListItem[]> {
    let query = {
      limit: String(params.limit)
    } as any;
    if (params.state) {
      query.stateFrom = String(params.state.from);
      query.stateTo = String(params.state.to);
    }
    if (params.fromId) {
      query.fromId = String(params.fromId);
    }
    return this._http.get(`${this._settings.apiBaseUrl}/debate/anouncement`, {
      params: query
    });
  }

}
