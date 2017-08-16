import DS from 'ember-data';

export const organizationKindMap = {
  'International': 1,
  'District': 11,
  'Noncompetitive': 12,
  'Affiliate': 13,
  'Division': 21,
  'Chapter': 30,
}

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'International',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      21: 'Division',
      30: 'Chapter',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    return organizationKindMap[deserialized];
  }
});
