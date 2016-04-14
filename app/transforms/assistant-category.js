import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'ACA',
      20: 'Other',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'ACA': 10,
      'Other': 20,
    };
    return map[deserialized];
  }
});
