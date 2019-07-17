import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      3: 'Fall',
      4: 'Spring',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Fall': 3,
      'Spring': 4,
    };
    return map[deserialized];
  }
});
