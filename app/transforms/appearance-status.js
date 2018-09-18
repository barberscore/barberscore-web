import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      7: 'Built',
      10: 'Started',
      20: 'Finished',
      25: 'Variance',
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
      'Variance': 25,
      'Verified': 30,
    };
    return map[deserialized];
  }
});
