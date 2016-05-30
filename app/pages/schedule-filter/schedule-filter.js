import {Page, NavParams, ViewController} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {JBCNConf} from '../../providers/jbcnconf';


@Page({
  templateUrl: 'build/pages/schedule-filter/schedule-filter.html'
})
export class ScheduleFilterPage {
  static get parameters() {
    return [[NavParams], [ViewController], [JBCNConf]];
  }

  constructor(navParams, viewCtrl, jbcnConf) {
    this.navParams = navParams;
    this.viewCtrl = viewCtrl;
    this.jbcnConf = jbcnConf;
    this.tags = [];

    // passed in array of tags that should be excluded (unchecked)
    let excludedTags = this.navParams.data;

    this.jbcnConf.getTags().forEach(tag => {
      this.tags.push({
        name: tag.name + " ( " + tag.countTalks() + " ) ",
        isChecked: (excludedTags.indexOf(tag.name) === -1)
      });
    });

  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tags.forEach(tag => {
      tag.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeTags = this.tags.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludeTags);
  }

  dismiss(data) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
