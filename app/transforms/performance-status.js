import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Started',
      20: 'Finished',
      50: 'Confirmed',
      90: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Started': 10,
      'Finished': 20,
      'Confirmed': 50,
      'Final': 90,
    };
    return map[deserialized];
  }
});
