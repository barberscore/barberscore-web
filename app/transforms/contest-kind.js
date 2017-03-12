import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Qualifier',
      '0': 'New',
      '10': 'Championship',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'Championship': '10',
      'Qualifier': '-10',
    };
    return map[deserialized];
  }
});
