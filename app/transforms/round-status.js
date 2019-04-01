import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Built',
      20: 'Started',
      25: 'Finished',
      27: 'Verified',
      30: 'Completed',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 10,
      'Started': 20,
      'Finished': 25,
      'Verified': 27,
      'Completed': 30,
};
    return map[deserialized];
  }
});
