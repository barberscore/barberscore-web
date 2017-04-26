import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      11: 'SCJC',
      12: 'DRCJ',
      13: 'CA',
      14: 'Judge',
      22: 'Representative',
      31: 'Staff',
      32: 'Admin',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'SCJC': 11,
      'DRCJ': 12,
      'CA': 13,
      'Judge': 14,
      'Representative': 21,
      'Staff': 31,
      'Admin': 32,
    };
    return map[deserialized];
  }
});
