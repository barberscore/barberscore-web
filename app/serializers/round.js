import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },
  attrs: {
    ossReport: {
      serialize: false
    },
    saReport: {
      serialize: false
    },
    legacyOss: {
      serialize: false
    },
    owners: {
      serialize: false
    },
  }
});
