import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute(attr) {
      return underscore(attr);
    },
    attrs: {
      assignments: {
        serialize: true
      },
      commonName: {
        serialize: false
      },
      fullName: {
        serialize: false
      },
    }
});
