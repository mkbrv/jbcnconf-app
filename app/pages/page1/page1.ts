import {Page} from 'ionic-angular';
import {JbcnService} from '../../services/jbcn.service';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers:[JbcnService]
})
export class Page1 {
    schedule;
    groups;
    date;
    constructor(jbcnService:JbcnService) {
        jbcnService.load().then(data => {
            this.groups = data.schedule[0].groups;
            this.date = data.schedule[0].date;
        });
    }
}
