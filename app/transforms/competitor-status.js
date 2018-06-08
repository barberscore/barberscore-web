import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Finished',
      '0': 'New',
      '10': 'Started',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'Started': '10',
      'Finished': '-10',
    };
    return map[deserialized];
  }
});
