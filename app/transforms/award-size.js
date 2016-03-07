import DS from 'ember-data';

export default DS.Transform.extend({
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
      180: 'Plateau B',
      190: 'Plateau I',
      200: 'Plateau II',
      210: 'Plateau III',
      220: 'Plateau IV',
      230: 'Small',
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
      'Plateau B': 180,
      'Plateau I': 190,
      'Plateau II': 200,
      'Plateau III': 210,
      'Plateau IV': 220,
      'Small': 230,
    };
    return map[deserialized];
  }
});
