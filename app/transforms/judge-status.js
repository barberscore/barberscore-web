import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      1: 'Active',
      2: 'Candidate',
      3: 'Inactive',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 1,
      'Candidate': 2,
      'Inactive': 3,
    };
    return map[deserialized];
  }
});
