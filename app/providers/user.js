import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class User {
    static get parameters() {
        return [[Events]];
    }

    constructor(events) {
        this._favorites = [];
        this.storage = new Storage(LocalStorage);
        this.events = events;
    }

    hasFavorite(sessionName) {
        return (this._favorites.indexOf(sessionName) > -1);
    }

    addFavorite(sessionName) {
        this._favorites.push(sessionName);
    }

    removeFavorite(sessionName) {
        let index = this._favorites.indexOf(sessionName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
    }

    /**
     * If the intro screen was displayed already we don't do it again;
     */
    isIntroVisible(afirmativeCallBack, negativeCallBack) {
        var introScreenKey = "INTRO_SCREEN",
            storage = this.storage,
            introScreenValue = storage.get(introScreenKey);

        introScreenValue.then(function (value) {
            if (value) {
                afirmativeCallBack();
            } else {
                negativeCallBack();
                storage.set(introScreenKey, true);
            }
        });
    }
}
