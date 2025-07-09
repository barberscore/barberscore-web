import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Alum',
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
      'Alum': '-10',
    };
    return map[deserialized];
  }
});
