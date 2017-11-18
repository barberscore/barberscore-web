import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-20': 'Legacy',
      '-10': 'Inactive',
      '0': 'New',
      '10': 'Active',
      '20': 'Exempt',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Legacy': '-20',
      'Inactive': '-10',
      'New': '0',
      'Active': '10',
      'Exempt': '20',
    };
    return map[deserialized];
  }
});
