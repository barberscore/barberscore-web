import EmberObject from '@ember/object';
import Transform from '@ember-data/serializer';

export default Transform.extend({
  serialize: function (value) {
    try {
      if (value.get('lower') != null && value.get('upper') != null) {
        return {
          lower: value.get('lower'),
          upper: value.get('upper'),
          bounds: "[)"
        };
      } else if (value.get('lower') != null && value.get('upper') == null) {
        return {
          lower: value.get('lower'),
          upper: null,
          bounds: "[)"
        };
      } else {
        return {};
      }
    } catch (err) {
      return {};
    }
  },
  deserialize: function (value) {
    if (value) {
      return EmberObject.create({
        lower: value['lower'],
        upper: value['upper']
      });
    } else {
      return null;
    }
  }
});
