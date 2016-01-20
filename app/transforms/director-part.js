import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Director',
      2: 'Co-Director',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Director': 1,
      'Co-Director': 2,
    };
    return map[deserialized];
  }
});
