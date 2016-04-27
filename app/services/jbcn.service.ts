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
        data.schedule = [];
        
        for(var i=0; i<json.schedule.length; i++) {
            var day = json.schedule[i];
            day.date = Date.parse(day.date);
            for(var j=0; j<day.meetings.length; j++) {
                console.debug(day.meetings[j].timeStart);
                day.meetings[j].timeStart = Date.parse(day.meetings[j].timeStart);
                day.meetings[j].timeEnd = Date.parse(day.meetings[j].timeEnd);
            }
            data.schedule.push(day);
            console.debug(day);
            
        }
        
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