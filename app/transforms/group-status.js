import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      '-5': 'AIC',
      '0': 'New',
      '10': 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'Active': '10',
      'AIC': '-5',
      'Inactive': '-10',
    };
    return map[deserialized];
  }
});
