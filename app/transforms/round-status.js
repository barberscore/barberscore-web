import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Built',
      20: 'Started',
      25: 'Completed',
      27: 'Verified',
      30: 'Published',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 10,
      'Started': 20,
      'Completed': 25,
      'Verified': 27,
      'Published': 30,
};
    return map[deserialized];
  }
});
