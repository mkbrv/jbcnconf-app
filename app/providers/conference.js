/**
 * Simple model, represents the back bone of the conference.
 * Used for storage and data structure purposes; eg: merge speaker talking twice
 */
export class Conference {


  static get Speaker() {

    return class Speaker {
      constructor(rawSpeaker) {
        this.name = rawSpeaker.name;
        this.description = rawSpeaker.description;
        this.biography = rawSpeaker.biography;
        this.image = rawSpeaker.image;
        this.twitter = rawSpeaker.twitter;
        this.ref = rawSpeaker.ref;
        this.talks = [];
      }

      /**
       *
       * @param talk
       */
      addTalk(talk) {
        this.talks.push(talk);
      }
    }
  }

  static get Talk() {
    return class Talk {
      constructor(rawTalk) {
        this.type = rawTalk.type;
        this.title = rawTalk.title;
        this.abstract = rawTalk.abstract;
        this.tags = rawTalk.tags;
        this.level = rawTalk.level;
      }

      /**
       *
       * @param speaker
       * @constructor
       */
      set Speaker(speaker) {
        this.speaker = speaker;
      }
    }
  }

  static get Tag() {
    return class Tag {
      /**
       *
       * @param name
       * @param talks Talk[]
       */
      constructor(name, talks) {
        this.name = name;
        this.talks = talks != undefined ? talks : [];
      }

      /**
       *
       * @param talk Conference.Talk
       */
      addTalk(talk) {
        this.talks.push(talk);
      }

      countTalks() {
        return this.talks.length;
      }
    }

  }

  /**
   *
   * @param speakersJSON speakers.json from the jbcnconf website
   * @param scheduleJSON TBD json from the jbcnconf website
   */
  constructor(speakersJSON, scheduleJSON) {

    this.speakers = [];
    this.talks = [];
    this.tags = new Map();

    this._buildSpeakerList(speakersJSON);
    this._indexTagsAndTalks();
  }

  _buildSpeakerList(speakersJSON) {
    speakersJSON.speakers.forEach(rawSpeaker => {
      var existingSpeaker = this.findSpeakerByRef(rawSpeaker.ref);
      if (existingSpeaker) {
        this._appendTalkToSpeaker(existingSpeaker, rawSpeaker.talk);
      } else {
        let speaker = new Conference.Speaker(rawSpeaker);
        this._appendTalkToSpeaker(speaker, rawSpeaker.talk);
        this.speakers.push(speaker);
      }
    });
  }

  /**
   *
   * @param speaker Conference.Speaker
   * @param rawTalk
   * @private
   */
  _appendTalkToSpeaker(speaker, rawTalk) {
    let talk = new Conference.Talk(rawTalk);
    speaker.addTalk(talk);
    talk.speaker = speaker.ref;
    this.talks.push(talk);
  }

  /**
   * loops through each speaker and take the talks, indexes them into the map
   * @private
   */
  _indexTagsAndTalks() {
    this.talks.forEach(talk => {
      talk.tags.forEach(tagString => {
        let tag = this.tags.get(tagString);
        if (tag) {
          tag.addTalk(talk);
        } else {
          tag = new Conference.Tag(tagString, [talk]);
          this.tags.set(tagString, tag);
        }
      });
    });
  }

  /**
   *
   * @param name string
   * @returns Conference.Speaker
   */
  findSpeakerByName(name) {
    var foundSpeaker;
    this.speakers.forEach(speaker => {
      if (speaker.name.toLowerCase() === name.toLowerCase()) {
        foundSpeaker = speaker;
      }
    });
    return foundSpeaker;
  }

  /**
   *
   * @param ref
   * @returns Conference.Speaker
   */
  findSpeakerByRef(ref) {
    var foundSpeaker;
    this.speakers.forEach(speaker => {
      if (speaker.ref.toLowerCase() === ref.toLowerCase()) {
        foundSpeaker = speaker;
      }
    });
    return foundSpeaker;
  }

  getSortedTagsByUsage() {
    var tagsArray = [...this.tags.values()];
    tagsArray.sort((tagOne, tagTwo) => tagTwo.countTalks() - tagOne.countTalks());
    return tagsArray;
  }

}


