import { underscore } from '@ember/string';
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  }
});
