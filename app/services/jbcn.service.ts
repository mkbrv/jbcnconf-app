import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

var jbcnData;

@Injectable()
export class JbcnService {

    http: Http;
    json: string;
    schedule;



    constructor(http: Http) {
        this.http = http;
    }

    processJson(json) {
        let data:any = {};
        this.json = JSON.stringify(json);
        localStorage.setItem("json", this.json);
        data.schedule = json.schedule;
        data.speakers = {};
        json.speakers.forEach((speaker) => {
            data.speakers[speaker.ref] = speaker;
        });
        return data;
    }

    load() {
        if (jbcnData) {
            return Promise.resolve(jbcnData);
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            this.http.get('data/data.json').subscribe(res => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                jbcnData = this.processJson(res.json());
                resolve(jbcnData);
            });
        });
    }

}