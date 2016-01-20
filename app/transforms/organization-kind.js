import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'International',
      10: 'District',
      20: 'Noncompetitive',
      30: 'Affiliate',
      40: 'Division',
      50: 'Harmony Incorporated',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 0,
      'District': 10,
      'Noncompetitive': 20,
      'Affiliate': 30,
      'Division': 40,
      'Harmony Incorporated': 50,
    };
    return map[deserialized];
  }
});
