import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Male',
      20: 'Female',
      30: 'Mixed',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Male': 10,
      'Female': 20,
      'Mixed': 30,
    };
    return map[deserialized];
  }
});
