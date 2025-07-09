import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      100: 'Plateau 1',
      110: 'Plateau 2',
      120: 'Plateau 3',
      130: 'Plateau 4',
      140: 'Plateau A',
      150: 'Plateau AA',
      160: 'Plateau AAA',
      170: 'Plateau AAAA',
      175: 'Plateau AAAAA',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Plateau 1': 100,
      'Plateau 2': 110,
      'Plateau 3': 120,
      'Plateau 4': 130,
      'Plateau A': 140,
      'Plateau AA': 150,
      'Plateau AAA': 160,
      'Plateau AAAA': 170,
      'Plateau AAAAA': 175,
    };
    return map[deserialized];
  }
});
