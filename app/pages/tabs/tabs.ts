<<<<<<< HEAD
import {Page} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
=======
import {Page, NavParams} from 'ionic-framework/ionic';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';
>>>>>>> ac1d1f05994b9d39c72b6744ba288c3d63288aef


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
<<<<<<< HEAD
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Page1;
  tab2Root: any = Page2;
  tab3Root: any = Page3;
=======
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
>>>>>>> ac1d1f05994b9d39c72b6744ba288c3d63288aef
}
