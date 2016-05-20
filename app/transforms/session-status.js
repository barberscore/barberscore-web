import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      2: 'Listed',
      4: 'Opened',
      8: 'Closed',
      10: 'Validated',
      20: 'Started',
      30: 'Finished',
      40: 'Drafted',
      45: 'Published',
      50: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Listed': 2,
      'Opened': 4,
      'Closed': 8,
      'Validated': 10,
      'Started': 20,
      'Finished': 30,
      'Drafted': 40,
      'Published': 45,
      'Final': 50,
    };
    return map[deserialized];
  }
});
