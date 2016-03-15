import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Eligible',
      20: 'Ineligible',
      30: 'Did Not Qualify',
      50: 'Qualified',
      90: 'Final',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Eligible': 10,
      'Ineligible': 20,
      'Did Not Qualify': 30,
      'Qualified': 50,
      'Final': 90,
    };
    return map[deserialized];
  }
});
