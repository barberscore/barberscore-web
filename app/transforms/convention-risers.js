import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
      return !deserialized ? deserialized.toArray() : null;
  },

  deserialize: function(serialized) {
    return Ember.A(serialized);
  }
});
