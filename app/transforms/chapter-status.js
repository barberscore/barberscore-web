import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Active',
      20: 'Inactive',
      30: 'Affiliate',
      50: 'Duplicate',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 10,
      'Inactive': 20,
      'Affiliate': 30,
      'Duplicate': 50,
    };
    return map[deserialized];
  }
});
