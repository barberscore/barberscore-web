import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'One',
      2: 'Two',
      3: 'Three',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'One': 1,
      'Two': 2,
      'Three': 3,
    };
    return map[deserialized];
  }
});
