import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute(attr) {
      return underscore(attr);
    },
    attrs: {
      image: {
        serialize: false
      },
      imageId: {
        serialize: false
      },
      entries: {
        serialize: true
      },
    }
});
