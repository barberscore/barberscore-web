import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      '-5': 'Completed',
      0: 'New',
      10: 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Inactive': '-10',
      'Completed': '-5',
      'New': 0,
      'Active': 10,
    };
    return map[deserialized];
  }
});
