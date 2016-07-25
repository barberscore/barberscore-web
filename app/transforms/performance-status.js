import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      5: 'Validated',
      10: 'Started',
      20: 'Finished',
      40: 'Flagged',
      60: 'Cleared',
      90: 'Published',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Validated': 5,
      'Started': 10,
      'Finished': 20,
      'Flagged': 40,
      'Cleared': 60,
      'Published': 90,
    };
    return map[deserialized];
  }
});
