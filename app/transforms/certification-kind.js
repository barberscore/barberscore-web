import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Chair',
      20: 'Past Chair',
      30: 'Specialist',
      40: 'Certified',
      50: 'Candidate',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chair': 10,
      'Past Chair': 20,
      'Specialist': 30,
      'Certified': 40,
      'Candidate': 50,
    };
    return map[deserialized];
  }
});
