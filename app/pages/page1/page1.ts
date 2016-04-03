import {Page} from 'ionic-angular';
import {JbcnService} from '../../services/jbcn.service';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers:[JbcnService]
})
export class Page1 {
    schedule = [];
    
    constructor(jbcnService:JbcnService) {
        jbcnService.load().then(data => {
            this.schedule = data.schedule;
        });
    }
}
