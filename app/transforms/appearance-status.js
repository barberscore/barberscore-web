import DS from '@ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-30': 'Disqualified',
      '-20': 'Scratched',
      '-10': 'Completed',
      0: 'New',
      7: 'Built',
      10: 'Started',
      20: 'Finished',
      25: 'Variance',
      30: 'Verified',
      40: 'Advanced',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Disqualified': '-30',
      'Scratched': '-20',
      'Completed': '-10',
      'New': 0,
      'Built': 7,
      'Started': 10,
      'Finished': 20,
      'Variance': 25,
      'Verified': 30,
      'Advanced': 40,
    };
    return map[deserialized];
  }
});
