import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Arranger',
      2: 'Co-Arranger',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Arranger': 1,
      'Co-Arranger': 2,
    };
    return map[deserialized];
  }
});
