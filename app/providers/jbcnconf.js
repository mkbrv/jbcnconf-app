import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user';
import {Configuration} from './configuration';
import {Conference} from './conference';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class JBCNConf {

  static get parameters() {
    return [[Http], [User], [Configuration]];
  }

  constructor(http, user, configuration) {
    this.http = http;
    this.user = user;
    this.configuration = configuration.getConfiguration();
    this.storage = new Storage(LocalStorage);
    this.SPEAKERS_STORAGE_KEY = "CONFERENCE_SPEAKERS";
  }


  loadSpeakers() {
    if (!this.speakersPromise) {
      this.speakersPromise = new Promise(resolve => {
        this.http.get(this.configuration.speakersURL)
          .subscribe(res => {
              resolve(res.json());
            },
            err => console.error(err));
      });
    }
  }


  /**
   * Will refresh speakers with fresh data from server;
   */
  refreshSpeakers() {
    var self = this;
    this.loadSpeakers();
    if (this.speakersPromise) {
      this.speakersPromise.then(function (data) {
        self.conference = new Conference(data);
        self.storage.set(self.SPEAKERS_STORAGE_KEY, JSON.stringify(self.conference));
        self.speakersPromise = null;
        self.speakersObserver(self.conference.speakers);
      });
    }
  }

  getSpeakers(callback) {
    var self = this;
    this.speakersObserver = callback;//register the callback as an observer;
    callback([]);//delivers the view instantly;
    //return from the cache;
    this.storage.get(this.SPEAKERS_STORAGE_KEY).then(function (data) {
      if (data) {
        self.cachedConference = JSON.parse(data);
        callback(self.cachedConference.speakers);
      }
    });
    this.refreshSpeakers();

    if (this.conference) {
      return this.conference.speakers;
    } else if (this.cachedConference) {
      return this.cachedConference.speakers;
    }
    return [];
  }

  /**
   * return the tags sorted by usage;
   * @returns Tags[]
   */
  getTags() {
    return this.conference.getSortedTagsByUsage();
  }

  /**
   *
   * @returns Talk[]
   */
  getTalks() {
    return this.conference.talks;
  }


}
