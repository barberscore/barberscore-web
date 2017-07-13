import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Championship',
      20: 'Award',
      30: 'Qualifier',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Championship': 10,
      'Award': 20,
      'Qualifier': 30,
    };
    return map[deserialized];
  }
});
