import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'International',
      1: 'District',
      2: 'Division',
      3: 'Chapter',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 0,
      'District': 1,
      'Division': 2,
      'Chapter': 3,
    };
    return map[deserialized];
  }
});
