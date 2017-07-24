import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Championship',
      20: 'Award',
      30: 'Qualifier',
      40: 'Sentinel',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Championship': 10,
      'Award': 20,
      'Qualifier': 30,
      'Sentinel': 40,
    };
    return map[deserialized];
  }
});
