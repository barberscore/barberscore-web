import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      5: 'DRCJ',
      10: 'CA',
      20: 'ACA',
      30: 'Music',
      40: 'Performance',
      50: 'Singing',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'DRCJ': 5,
      'CA': 10,
      'ACA': 20,
      'Music': 30,
      'Performance': 40,
      'Singing': 50,
    };
    return map[deserialized];
  }
});
