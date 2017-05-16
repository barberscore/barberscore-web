import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New'
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0
    };
    return map[deserialized];
  }
});
