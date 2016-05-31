import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {User} from './providers/user';
import {Configuration} from './providers/configuration';
import {ConferenceData} from './providers/conference-data';
import {JBCNConf} from './providers/jbcnconf';
import {TabsPage} from './pages/tabs/tabs';
import {IntroPage} from './pages/intro/intro';

@App({
  templateUrl: 'build/app.html',
  providers: [Configuration, User, JBCNConf, ConferenceData],
  config: {
    tabbarPlacement: "bottom"
  },
  queries: {
    nav: new ViewChild('content')
  }
})


class ConferenceApp {
  static get parameters() {
    return [
      [Events], [User], [Platform], [MenuController], [JBCNConf]
    ]
  }

  constructor(events, user, platform, menu, jbcnConf) {
    this.user = user;
    this.events = events;
    this.menu = menu;
    this.jbcnConf = jbcnConf;

    this.appPages = [
      {title: 'Schedule', component: TabsPage, icon: 'calendar'},
      {title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts'},
      {title: 'Map', component: TabsPage, index: 2, icon: 'map'},
      {title: 'About', component: TabsPage, index: 3, icon: 'information-circle'}
    ];

    this.accountPages = [
      {title: 'Intro', component: IntroPage, icon: 'log-out'}
    ];

    this.jbcnConf.loadSpeakers();
    this.startApp(platform);
  }


  startApp(platform) {
    var app = this;
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // We plan to add auth to only show the login page if not logged in
      var hideSplashScreen = function () {
        StatusBar.styleDefault();
        Splashscreen.hide();
      };
      app.user.isIntroVisible(function () {
        app.root = TabsPage;
        hideSplashScreen();
      }, function () {
        app.root = IntroPage;
        hideSplashScreen();
      });
    });
  }

  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
  }

  refresh() {
    this.jbcnConf.refreshSpeakers();
  }

}
