import {Page} from 'ionic-angular';
import {Configuration} from '../../providers/configuration';
import {Network, Connection} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {

  static get parameters() {
    return [[Configuration]];
  }

  constructor(configuration) {
    this.configuration = configuration.getConfiguration();
    this.connection = Network.connection.type;
  }
}
