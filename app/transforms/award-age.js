import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Seniors',
      30: 'Youth',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Seniors': 10,
      'Youth': 30,
    };
    return map[deserialized];
  }
});
