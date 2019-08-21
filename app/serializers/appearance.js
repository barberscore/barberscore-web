import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute(attr) {
      return underscore(attr);
    },
  attrs: {
    songs: {
      serialize: true
    },
    owners: {
      serialize: false
    },
    varianceReport: {
      serialize: false
    },
    csaReport: {
      serialize: false
    },
  }
});
