import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'International',
      1: 'District/Affiliates',
      2: 'Division',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 0,
      'District/Affiliates': 1,
      'Division': 2,
    };
    return map[deserialized];
  }
});
