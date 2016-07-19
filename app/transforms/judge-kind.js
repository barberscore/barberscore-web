import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Chair',
      20: 'Past Chair',
      30: 'Specialist',
      35: 'DRCJ',
      40: 'Certified',
      50: 'Candidate',
      60: 'Lapsed',
      70: 'Retired',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chair': 10,
      'Past Chair': 20,
      'Specialist': 30,
      'DRCJ': 35,
      'Certified': 40,
      'Candidate': 50,
      'Lapsed': 60,
      'Retired': 70,
    };
    return map[deserialized];
  }
});
