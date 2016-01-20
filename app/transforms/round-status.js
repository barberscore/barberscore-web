import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Built',
      15: 'Ready',
      20: 'Started',
      25: 'Finished',
      30: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 10,
      'Ready': 15,
      'Started': 20,
      'Finished': 25,
      'Final': 30,
    };
    return map[deserialized];
  }
});
