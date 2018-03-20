import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      5: 'DRCJ',
      10: 'Contest Administrator',
      30: 'Music Judge',
      40: 'Performance Judge',
      50: 'Singing Judge',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'DRCJ': 5,
      'Contest Administrator': 10,
      'Music Judge': 30,
      'Performance Judge': 40,
      'Singing Judge': 50,
    };
    return map[deserialized];
  }
});
