import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Built',
      20: 'Started',
      25: 'Completed',
      27: 'Finalized',
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
      'Finalized': 27,
      'Published': 30,
};
    return map[deserialized];
  }
});
