import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      5: 'Invited',
      7: 'Withdrawn',
      10: 'Submitted',
      20: 'Approved',
      52: 'Scratched',
      55: 'Disqualified',
      57: 'Final',
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
      'Scratched': 52,
      'Disqualified': 55,
      'Final': 57,
};
    return map[deserialized];
  }
});
