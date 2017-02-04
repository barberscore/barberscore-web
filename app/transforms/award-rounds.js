import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 1,
      2: 2,
      3: 3,
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      1: 1,
      2: 2,
      3: 3,
    };
    return map[deserialized];
  }
});
