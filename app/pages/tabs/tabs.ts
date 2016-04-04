import {Page} from 'ionic-angular';
import {Schedule} from '../schedule/schedule';
import {Speakers} from '../speakers/speakers';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Schedule;
  tab2Root: any = Speakers;
  tab3Root: any = Page3;
}
