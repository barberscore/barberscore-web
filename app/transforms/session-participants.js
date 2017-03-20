import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  store: Ember.inject.service(),
  serialize: function(deserialized) {
    if (deserialized !== undefined) {
      let mapped = deserialized.mapBy('id');
      return mapped.toArray();
    } else {
      return null;
    }
  },

  deserialize: function(serialized) {
    let _this = this;
    let out = [];
    let ids = Ember.A(serialized);
    ids.forEach(function(item) {
      let obj = _this.get('store').peekRecord('entity', item);
      out.addObject(obj);
    });
    return out;
  }
});
