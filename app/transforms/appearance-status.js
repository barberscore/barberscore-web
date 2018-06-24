import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      7: 'Built',
      10: 'Started',
      20: 'Finished',
      30: 'Verified',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 7,
      'Started': 10,
      'Finished': 20,
      'Verified': 30,
    };
    return map[deserialized];
  }
});
