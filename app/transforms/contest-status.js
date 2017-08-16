import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Open',
      15: 'Closed',
      35: 'Validated',
      42: 'Finished',
      45: 'Announced',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Open': 10,
      'Closed': 15,
      'Validated': 35,
      'Finished': 42,
      'Announced': 45,
      'Archived': 95,
};
    return map[deserialized];
  }
});
