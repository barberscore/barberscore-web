import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Finals',
      2: 'Semi-Finals',
      3: 'Quarter-Finals',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Finals': 1,
      'Semi-Finals': 2,
      'Quarter-Finals': 3,
    };
    return map[deserialized];
  }
});
