import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Active',
      20: 'Inactive',
      30: 'Retired',
      40: 'Deceased',
      50: 'Stix Issue',
      60: 'Possible Duplicate',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Active': 10,
      'Inactive': 20,
      'Retired': 30,
      'Deceased': 40,
      'Stix Issue': 50,
      'Possible Duplicate': 60,
    };
    return map[deserialized];
  }
});
