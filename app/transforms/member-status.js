import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      '0': 'New',
      '5': 'Provisional',
      '10': 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'Active': '10',
      'Provisional': '5',
      'Inactive': '-10',
    };
    return map[deserialized];
  }
});
