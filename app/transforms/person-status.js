import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      1: 'Active',
      2: 'Inactive',
      3: 'Retired',
      5: 'Deceased',
      6: '(Six)',
      9: '(Nine)',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 1,
      'Inactive': 2,
      'Retired': 3,
      'Deceased': 5,
      '(Six)': 6,
      '(Nine)': 9,
    };
    return map[deserialized];
  }
});

