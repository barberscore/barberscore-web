import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Excluded',
      '0': 'New',
      '10': 'Included',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Excluded': '-10',
      'New': '0',
      'Included': '10',
};
    return map[deserialized];
  }
});
