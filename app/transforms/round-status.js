import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      15: 'Validated',
      20: 'Started',
      25: 'Finished',
      50: 'Published',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Validated': 15,
      'Started': 20,
      'Finished': 25,
      'Published': 50,
    };
    return map[deserialized];
  }
});
