import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Music',
      2: 'Performance',
      3: 'Singing',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Music': 1,
      'Performance': 2,
      'Singing': 3,
    };
    return map[deserialized];
  }
});
