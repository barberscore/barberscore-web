import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-1': 'Director',
      1: 'Tenor',
      2: 'Lead',
      3: 'Baritone',
      4: 'Bass',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Director': '-1',
      'Tenor': 1,
      'Lead': 2,
      'Baritone': 3,
      'Bass': 4,
    };
    return map[deserialized];
  }
});
