import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      4: 'Open',
      8: 'Closed',
      10: 'Ready',
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
      'Open': 4,
      'Closed': 8,
      'Built': 10,
      'Started': 20,
      'Finished': 30,
      'Drafted': 40,
      'Published': 45,
      'Final': 50,
    };
    return map[deserialized];
  }
});
