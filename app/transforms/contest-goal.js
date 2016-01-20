import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Championship',
      2: 'Qualifier',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Championship': 1,
      'Qualifier': 2,
    };
    return map[deserialized];
  }
});
