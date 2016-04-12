import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    try {
      return {
        lower: value.get('lower'),
        upper: value.get('upper'),
        bounds: "[)"
      };
    } catch(err) {
      return {};
    }
    if (value.get('lower') == null || value.get('upper')==null) {
      return {
        lower: value.get('lower'),
        upper: value.get('upper'),
        bounds: "[)"
      };
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
