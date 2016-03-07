import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'First',
      2: 'Second',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'First': 1,
      'Second': 2,
    };
    return map[deserialized];
  }
});
