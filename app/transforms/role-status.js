import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Active',
      20: 'Inactive',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 0,
      'Inactive': 0,
    };
    return map[deserialized];
  }
});
