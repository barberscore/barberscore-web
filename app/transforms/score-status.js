import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      20: 'Entered',
      30: 'Flagged',
      35: 'Validated',
      40: 'Confirmed',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Entered': 20,
      'Flagged': 30,
      'Validated': 35,
      'Confirmed': 40,
      'Final': 50,
    };
    return map[deserialized];
  }
});
