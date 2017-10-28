import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      4: 'Opened',
      8: 'Closed',
      10: 'Verified',
      20: 'Started',
      30: 'Finished',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Opened': 4,
      'Closed': 8,
      'Verified': 10,
      'Started': 20,
      'Finished': 30,
    };
    return map[deserialized];
  }
});
