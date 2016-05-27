import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user';
import {Configuration} from './configuration';


@Injectable()
export class Speakers {

    static get parameters() {
        return [[Http], [User], [Configuration]];
    }

    constructor(http, user, configuration) {
        this.http = http;
        this.user = user;
        this.configuration = configuration.getConfiguration();
        this.speakersList = [];
        this.talks = [];
        this.tags = new Map();
    }

    buildTalkList() {
        this.speakersList.forEach(speaker => {
            this.talks.push(speaker.talk);
            speaker.talk.tags.forEach(tag => {
                this.tags.set(tag, {});
            });
        });

        console.log(this);
        console.log(this.getTags());
    };

    loadSpeakers() {
        this.http.get(this.configuration.speakersURL).subscribe(res => {
            this.speakersList = res.json().speakers;
            this.buildTalkList();
        });
        return this;
    }

    list() {
        return this.speakersList;
    }

    getTags() {
        return [...this.tags.keys()].sort();
    }

    getTalks() {
        return this.talks;
    }


}
