import {Page} from 'ionic-angular';
import {Configuration} from '../../providers/configuration';


@Page({
    templateUrl: 'build/pages/map/map.html'
})
export class MapPage {

    static get parameters() {
        return [[Configuration]];
    }

    constructor(configuration) {
        this.configuration = configuration.getConfiguration();
    }

    onPageLoaded() {

        let mapEle = document.getElementById('map');

        let map = new google.maps.Map(mapEle, {
            center: {lat: 41.3893361, lng: 2.1907744},
            zoom: 16
        });

        let infoWindow = new google.maps.InfoWindow({
            content: '<h5>' + this.configuration.location + '</h5> Carrer de Ramon Trias Fargas, 25-27, 08002 Barcelona ' +
            '<h4><a target="_blank" href="https://www.google.es/maps/dir//Carrer+de+Ramon+Trias+Fargas,+25,+08005+Barcelona/@41.3895849,2.1914035,19z/data=!4m16!1m7!3m6!1s0x12a4a304d9665cd7:0xb29da51e07572e77!2sCarrer+de+Ramon+Trias+Fargas,+25,+08005+Barcelona!3b1!8m2!3d41.3895849!4d2.1914035!4m7!1m0!1m5!1m1!1s0x12a4a304d9665cd7:0xb29da51e07572e77!2m2!1d2.1914035!2d41.3895849?hl=en" class="navigate-link"> <div class="icon navigate-icon"></div> <div class="navigate-text">Directions</div> </a></h4>'
        });
        let marker = new google.maps.Marker({
            position: {name: this.configuration.location, lat: 41.3893361, lng: 2.1907744},
            map: map,
            title: this.configuration.location
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });


        google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
        });
    }
}
