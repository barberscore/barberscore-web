import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
    if (deserialized) {
      if (deserialized.length !== 0) {
        return deserialized.toArray();
      }
    }
    return null;
  },

  deserialize: function(serialized) {
    if (serialized) {
      if (serialized.length !== 0) {
        return Ember.A(serialized);
      }
    }
    return null;
  }
});
