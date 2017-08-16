import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Verified',
      38: 'Finished',
      40: 'Confirmed',
      50: 'Final',
      90: 'Announced',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Verified': 10,
      'Finished': 38,
      'Confirmed': 40,
      'Final': 50,
      'Announced': 90,
      'Archived': 95,
};
    return map[deserialized];
  }
});
