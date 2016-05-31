import {NavController, Page, ActionSheet} from 'ionic-angular';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';
import {JBCNConf} from '../../providers/jbcnconf'
import {Configuration} from '../../providers/configuration'

@Page({
  templateUrl: 'build/pages/speaker-list/speaker-list.html'
})
export class SpeakerListPage {
  static get parameters() {
    return [[NavController], [JBCNConf], [Configuration]];
  }

  constructor(nav, jbcnConf, configuration) {
    this.nav = nav;
    this.jbcnConf = jbcnConf;
    this.configuration = configuration;
    this.initialiseSpeakers();
  }

  initialiseSpeakers(callback) {
    this.speakers = [];
    if (callback) {
      this.jbcnConf.getSpeakers(callback)
    } else {
      this.jbcnConf.getSpeakers(data => this.speakers = data)
    }
  }

  getSpeakers(searchbar) {
    // set q to the value of the searchbar
    var q = searchbar.value;
    // if the value is an empty string don't filter the speakers
    if (q.trim() == '') {
      this.initialiseSpeakers();
      return;
    }

    // Reset speakers back to all of the speakers
    var self = this;
    this.initialiseSpeakers(function (data) {
      self.speakers = data.filter((v) => {
        return v.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
    });

  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speaker) {
    this.nav.push(SpeakerDetailPage, speaker);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`${speaker.twitter}`);
  }

}
