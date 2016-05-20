import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
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
      'Cleareed': 25,
      'Flagged': 30,
      'Revised': 35,
      'Confirmed': 40,
    };
    return map[deserialized];
  }
});
