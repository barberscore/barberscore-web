import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      40: 'Confirmed',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Confirmed': 40,
      'Final': 50,
    };
    return map[deserialized];
  }
});
