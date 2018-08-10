import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Championship',
      30: 'Qualifier',
      35: 'Top',
      40: 'Award',
      50: 'Deferred',
      60: 'Manual',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Championship': 10,
      'Qualifier': 30,
      'Top': 35,
      'Award': 40,
      'Deferred': 50,
      'Manual': 60,
    };
    return map[deserialized];
  }
});
