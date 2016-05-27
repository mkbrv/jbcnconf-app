import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {

    constructor() {
        this.configuration = {
            date: "16-18th June 2016",
            location: "UPF Campus Ciutadella",
            contactEmail: "info@jbcnconf.com",
            twitter: "twitter.com/jbcnconf",

            jbcnURL: "http://www.jbcnconf.com/2016",
            speakersURL: "http://www.jbcnconf.com/2016/assets/json/speakers.json"

        };
    }

    getConfiguration() {
        return this.configuration;
    }
}
