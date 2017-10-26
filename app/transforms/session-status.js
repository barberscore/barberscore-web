import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      2: 'Published',
      4: 'Opened',
      6: 'Restricted',
      8: 'Closed',
      10: 'Verified',
      20: 'Started',
      30: 'Finished',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Published': 2,
      'Opened': 4,
      'Restricted': 6,
      'Closed': 8,
      'Verified': 10,
      'Prepared': 15,
      'Finished': 30,
      'Archived': 95,
    };
    return map[deserialized];
  }
});
