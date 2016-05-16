import {Page, NavParams} from 'ionic-angular';

import {Inject} from 'angular2/core';
import {JbcnService} from '../../services/jbcn.service';

@Page({
    templateUrl: 'build/pages/speaker-detail/speaker-detail.html'
})
export class SpeakerDetail {
    speaker;
    constructor(navParams:NavParams, jbcnService:JbcnService) {
        this.speaker = navParams.data;
    }
}