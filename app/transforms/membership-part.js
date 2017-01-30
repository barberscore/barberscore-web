import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Tenor',
      2: 'Lead',
      3: 'Baritone',
      4: 'Bass',
      5: 'Director',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Tenor': 1,
      'Lead': 2,
      'Baritone': 3,
      'Bass': 4,
      'Director': 5,
    };
    return map[deserialized];
  }
});
