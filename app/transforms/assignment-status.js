import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      '0': 'New',
      '10': 'Active',
      '20': 'Scheduled',
      '30': 'Withdrawn',
      '40': 'Confirmed',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Inactive': '-10',
      'New': '0',
      'Active': '10',
      'Scheduled': '20',
      'Withdrawn': '30',
      'Confirmed': '40',
    };
    return map[deserialized];
  }
});
