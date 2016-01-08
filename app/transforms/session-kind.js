import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Quartet',
      2: 'Chorus',
      3: 'Seniors',
      4: 'Collegiate',
      5: 'Novice',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Quartet': 1,
      'Chorus': 2,
      'Seniors': 3,
      'Collegiate': 4,
      'Novice': 5,
    };
    return map[deserialized];
  }
});
