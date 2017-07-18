import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      2: 'Published',
      4: 'Opened',
      8: 'Closed',
      10: 'Validated',
      20: 'Started',
      30: 'Finished',
      45: 'Announced',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Published': 2,
      'Opened': 4,
      'Closed': 8,
      'Validated': 10,
      'Started': 20,
      'Finished': 30,
      'Announced': 45,
    };
    return map[deserialized];
  }
});
