import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      2: 'Built',
      5: 'Invited',
      7: 'Withdrawn',
      10: 'Submitted',
      20: 'Approved',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Built': 2,
      'Invited': 5,
      'Withdrawn': 7,
      'Submitted': 10,
      'Approved': 20,
};
    return map[deserialized];
  }
});
