import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },
  attrs: {
    scores: {
      serialize: true
    },
    psaReport: {
      serialize: false
    },
    area: {
      serialize: false
    },
  }
});
