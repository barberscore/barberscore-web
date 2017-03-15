import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
      let mapped = deserialized.mapBy('id');
      console.log(mapped);
      return !mapped ? mapped.toArray() : null;
  },

  deserialize: function(serialized) {
    // serialized.forEach
    return Ember.A(serialized);
  }
});
