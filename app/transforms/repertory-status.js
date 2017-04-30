import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Invalid',
      '0': 'New',
      '10': 'Valid',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'Valid': '10',
      'Invalid': '-10',
    };
    return map[deserialized];
  }
});
