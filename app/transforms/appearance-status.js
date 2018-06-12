import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Excluded',
      0: 'New',
      2: 'Published',
      5: 'Verified',
      7: 'Built',
      10: 'Started',
      20: 'Finished',
      30: 'Confirmed',
      35: 'Included',
      40: 'Flagged',
      50: 'Scratched',
      60: 'Cleared',
      90: 'Announced',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Excluded': '-10',
      'New': 0,
      'Published': 2,
      'Verified': 5,
      'Built': 7,
      'Started': 10,
      'Finished': 20,
      'Confirmed': 30,
      'Included': 35,
      'Flagged': 40,
      'Scratched': 50,
      'Cleared': 60,
      'Announced': 90,
      'Archived': 95,
    };
    return map[deserialized];
  }
});
