import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user';
import {Configuration} from './configuration';
import {Conference} from './conference';

@Injectable()
export class JBCNConf {

  static get parameters() {
    return [[Http], [User], [Configuration]];
  }

  constructor(http, user, configuration) {
    this.http = http;
    this.user = user;
    this.configuration = configuration.getConfiguration();
  }

  loadSpeakers() {
    this.http.get(this.configuration.speakersURL).subscribe(res => {
      this.conference = new Conference(res.json());
    });
    return this;
  }

  list() {
    return this.conference.speakers;
  }

  getTags() {
    return this.conference.getSortedTagsByUsage();
  }

  getTalks() {
    return this.conference.talks;
  }


}
