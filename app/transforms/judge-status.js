import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Scheduled',
      20: 'Confirmed',
      30: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Scheduled': 10,
      'Confirmed': 20,
      'Final': 30,
    };
    return map[deserialized];
  }
});
