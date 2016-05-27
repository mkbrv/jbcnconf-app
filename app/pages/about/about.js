import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor() {
    this.conferenceDate = '16-18 June 2016';
  }
}
