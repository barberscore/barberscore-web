import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      0: 'Unknown',
      1: 'Single',
      2: 'Double',
      3: 'Triple',
      4: 'Quadruple',
      5: 'Quintiple',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Unknown': 0,
      'Single': 1,
      'Double': 2,
      'Triple': 3,
      'Quadruple': 3,
      'Quintiple': 3,
    };
    return map[deserialized];
  }
});
