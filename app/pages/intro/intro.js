import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;

    this.slides = [
      {
        title: "The first big Java and JVM conference in Spain",
        description: "presented by the Java User Group Barcelona",
        image: "img/jbcnconf-logo.png"
      },
      {
        title: "What is J|BCN|Conf?",
        description: " 3-days to share knowledge and experiences on <b>Java</b>, <b>JVM</b> and open source technologies.<br><br>" +
        "Do not miss the opportunity to participate in this event and to immerse yourself in interesting technology related talks.<br><br>" +
        "Barcelona will host this great event next <b>16th to 18th of June 2016.</b>",
        image: "img/jbcnconf.jpg"
      },
      {
        title: "BCN JUG",
        description: "is organizing talks and meetups focused on Java topics, looking forward to spin this technology from our hometown to the rest of the world.",
        image: "img/jbcn_blue.png"
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the intro page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the intro page
    this.menu.enable(true);
  }

}
