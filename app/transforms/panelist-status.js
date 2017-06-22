import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Archived',
      0: 'New',
      10: 'Scheduled',
      20: 'Confirmed',
      25: 'Verified',
      30: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Archived': '-10',
      'New': 0,
      'Scheduled': 10,
      'Confirmed': 20,
      'Verified': 25,
      'Final': 30,
    };
    return map[deserialized];
  }
});
