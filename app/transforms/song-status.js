import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Verified',
      38: 'Finished',
      40: 'Confirmed',
      50: 'Final',
      90: 'Published',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Verified': 10,
      'Finished': 38,
      'Confirmed': 40,
      'Final': 50,
      'Published': 90,
    };
    return map[deserialized];
  }
});
