import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'International',
      20: 'District',
      30: 'Division',
      40: 'District and Division',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 10,
      'District': 20,
      'Division': 30,
      'District and Division': 40,
    };
    return map[deserialized];
  }
});
