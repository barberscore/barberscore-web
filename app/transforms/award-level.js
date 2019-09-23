import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Championship',
      30: 'Qualifier',
      45: 'Representative',
      50: 'Deferred',
      60: 'Manual',
      70: 'Improved - Raw',
      80: 'Improved - Standard',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Championship': 10,
      'Qualifier': 30,
      'Representative': 45,
      'Deferred': 50,
      'Manual': 60,
      'Improved - Raw': 70,
      'Improved - Standard': 80,
    };
    return map[deserialized];
  }
});
