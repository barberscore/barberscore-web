import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      5: 'DRCJ',
      9: 'PC',
      10: 'ADM',
      30: 'Music',
      40: 'Performance',
      50: 'Singing',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'DRCJ': 5,
      'PC': 9,
      'ADM': 10,
      'Music': 30,
      'Performance': 40,
      'Singing': 50,
    };
    return map[deserialized];
  }
});
