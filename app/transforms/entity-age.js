import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Seniors',
      20: 'Collegiate',
      30: 'Youth',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Seniors': 0,
      'Collegiate': 20,
      'Youth': 30,
    };
    return map[deserialized];
  }
});
