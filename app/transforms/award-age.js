import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'All',
      10: 'Seniors',
      20: 'Collegiate',
      30: 'Youth',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'All': 0,
      'Seniors': 10,
      'Collegiate': 20,
      'Youth': 30,
    };
    return map[deserialized];
  }
});
