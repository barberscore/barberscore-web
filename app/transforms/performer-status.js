import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Registered',
      20: 'Accepted',
      30: 'Declined',
      40: 'Dropped',
      // 45: 'Evaluation',
      50: 'Validated',
      52: 'Scratched',
      55: 'Disqualified',
      57: 'Started',
      60: 'Finished',
      // 90: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Registered': 10,
      'Accepted': 20,
      'Declined': 30,
      'Dropped': 40,
      // 'Evaluation': 45,
      'Validated': 50,
      'Scratched': 52,
      'Disqualified': 55,
      'Started': 576,
      'Finished': 60,
      // 'Final': 90,
    };
    return map[deserialized];
  }
});
