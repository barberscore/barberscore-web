import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Summer',
      2: 'Midwinter',
      3: 'Fall',
      4: 'Spring',
      9: 'Video',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Summer': 1,
      'Midwinter': 2,
      'Fall': 3,
      'Spring': 4,
      'Video': 9,
    };
    return map[deserialized];
  }
});
