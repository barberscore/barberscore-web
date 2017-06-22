import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Verified',
      25: 'Cleared',
      30: 'Flagged',
      35: 'Revised',
      40: 'Confirmed',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Verified': 10,
      'Cleared': 25,
      'Flagged': 30,
      'Revised': 35,
      'Confirmed': 40,
    };
    return map[deserialized];
  }
});
