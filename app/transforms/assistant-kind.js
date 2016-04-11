import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Official',
      20: 'Practice',
      30: 'Composite',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Official': 10,
      'Practice': 20,
      'Composite': 30,
    };
    return map[deserialized];
  }
});
