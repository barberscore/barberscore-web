import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'General',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'General': 10,
    };
    return map[deserialized];
  }
});
