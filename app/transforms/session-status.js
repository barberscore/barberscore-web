import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Built',
      20: 'Started',
      25: 'Ranked',
      30: 'Finished',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 10,
      'Started': 20,
      'Ranked': 25,
      'Finished': 30,
      'Final': 50,
    };
    return map[deserialized];
  }
});
