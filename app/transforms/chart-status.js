import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-20': 'Protected',
      '-10': 'Inactive',
      '0': 'New',
      '10': 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Protected': '-20',
      'New': '0',
      'Active': '10',
      'Inactive': '-10',
    };
    return map[deserialized];
  }
});
