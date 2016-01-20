import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Individual',
      2: 'Team',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Individual': 1,
      'Team': 2,
    };
    return map[deserialized];
  }
});
