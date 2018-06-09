import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-30': 'Disqualified',
      '-20': 'Scratched',
      '-10': 'Finished',
      '0': 'New',
      '10': 'Started',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Disqualified': '-30',
      'Scratched': '-20',
      'Finished': '-10',
      'New': '0',
      'Started': '10',
    };
    return map[deserialized];
  }
});
