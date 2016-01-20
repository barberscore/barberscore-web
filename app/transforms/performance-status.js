import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      20: 'Started',
      25: 'Finished',
      40: 'Confirmed',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Started': 20,
      'Finished': 25,
      'Confirmed': 40,
      'Final': 50,
    };
    return map[deserialized];
  }
});
