import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    if (value.get('lower') && value.get('upper')) {
    var dt = {
        lower: value.get('lower'),
        upper: value.get('upper'),
        bounds: "[)"
      };
      return dt;
    } else {
      return {};
    }
  },
  deserialize: function(value) {
    if (value) {
      return Ember.Object.create({
          lower: value['lower'],
          upper: value['upper']
      });
    } else {
      return null;
    }
  }
});
