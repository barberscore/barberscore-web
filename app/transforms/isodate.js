import moment from 'moment';
import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    if (serialized) {
      return moment(serialized).toDate();
    }
    return serialized;
  },
  serialize: function(deserialized) {
    if (deserialized) {
      return moment(deserialized).format('YYYY-MM-DD');
    }
    return deserialized;
  }
});
