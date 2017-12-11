import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Withdrawn',
      '0': 'New',
      '10': 'Confirmed',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Withdrawn': '-10',
      'New': '0',
      'Active': '10',
    };
    return map[deserialized];
  }
});
