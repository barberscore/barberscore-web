import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Scheduled',
      15: 'Upcoming',
      20: 'Started',
      30: 'Finished',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Scheduled': 10,
      'Upcoming': 15,
      'Started': 20,
      'Finished': 30,
      'Final': 50,
    };
    return map[deserialized];
  }
});
