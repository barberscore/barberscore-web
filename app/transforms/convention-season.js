import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'International',
      2: 'Midwinter',
      3: 'Fall',
      4: 'Spring',
      9: 'Video',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 1,
      'Midwinter': 2,
      'Fall': 3,
      'Spring': 4,
      'Video': 9,
    };
    return map[deserialized];
  }
});