import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'New',
      10: 'Eligible',
      20: 'Ineligible',
      40: 'District Representative',
      50: 'Qualified',
      55: 'Validated',
      60: 'Finished',
      70: 'Scratched',
      80: 'Disqualified',
      90: 'Announced',
      95: 'Archived',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': 0,
      'Eligible': 10,
      'Ineligible': 20,
      'District Representative': 40,
      'Qualified': 50,
      'Validated': 55,
      'Finished': 60,
      'Scratched': 70,
      'Disqualified': 80,
      'Announced': 90,
      'Archived': 95,
};
    return map[deserialized];
  }
});
