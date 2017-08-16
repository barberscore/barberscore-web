import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      5: 'Invited',
      7: 'Withdrawn',
      10: 'Submitted',
      20: 'Approved',
      30: 'Rejected',
      50: 'Verified',
      52: 'Scratched',
      55: 'Disqualified',
      57: 'Started',
      60: 'Finished',
      70: 'Completed',
      90: 'Announced',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Invited': 5,
      'Withdrawn': 7,
      'Submitted': 10,
      'Approved': 20,
      'Rejected': 30,
      'Verified': 50,
      'Scratched': 52,
      'Disqualified': 55,
      'Started': 576,
      'Finished': 60,
      'Completed': 70,
      'Announced': 90,
      'Archived': 95,
};
    return map[deserialized];
  }
});
