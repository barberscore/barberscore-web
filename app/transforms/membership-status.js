import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '0': 'New',
      '10': 'Active',
      '-10': 'Inactive',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 10,
      'Inactive': -10,
    };
    return map[deserialized];
  }
});
