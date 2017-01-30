import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '0': 'New',
      '1': 'One',
      '10': 'Ten',
      '20': 'Twenty',
      '30': 'Thirty',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'New': '0',
      'One': '1',
      'Ten': '10',
      'Twenty': '20',
      'Thirty': '30',
    };
    return map[deserialized];
  }
});
