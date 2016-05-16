import {Page,NavController, NavParams} from 'ionic-angular';

import {Inject} from 'angular2/core';
import {JbcnService} from '../../services/jbcn.service';
import {SpeakerDetail} from '../speaker-detail/speaker-detail';

@Page({
    templateUrl: 'build/pages/meeting-detail/meeting-detail.html'
})
export class MeetingDetail {
    meeting;
    speakers;
    nav: NavController;
    constructor(navParams:NavParams, jbcnService:JbcnService,nav: NavController) {
        this.meeting = navParams.data;
        this.nav = nav;
        jbcnService.load().then(data => {
            this.speakers = [];
            for(var i=0; i<this.meeting.speakers.length; i++) {
                let ref = this.meeting.speakers[i];
                let speaker = data.speakersRef[ref];
                this.speakers.push(speaker);
            }
        });
    }
    
     goToSpeakerDetail(speaker) {
        this.nav.push(SpeakerDetail, speaker);
    }
}