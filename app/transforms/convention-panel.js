import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    let map = {
      1: 'Single',
      2: 'Double',
      3: 'Triple',
      4: 'Quadruple',
      5: 'Quintuple',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    let map = {
      'Single': 1,
      'Double': 2,
      'Triple': 3,
      'Quadruple': 4,
      'Quintuple': 5,
    };
    return map[deserialized];
  }
});
