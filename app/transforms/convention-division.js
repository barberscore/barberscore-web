import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      200: 'Division I',
      210: 'Division II',
      220: 'Division III',
      230: 'Division IV',
      240: 'Division V',
      250: 'Arizona Division',
      260: 'NE/NW Division',
      270: 'SE/SW Division',
      280: 'Division One/Packerland Division',
      290: 'Northern Plains Division',
      300: '10,000 Lakes and Southwest Division',
      310: 'Atlantic Division',
      320: 'Northern and Western Division',
      330: 'Southern Division',
      340: 'Sunrise Division',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Division I': 200,
      'Division II': 210,
      'Division III': 220,
      'Division IV': 230,
      'Division V': 240,
      'Arizona Division': 250,
      'NE/NW Division': 260,
      'SE/SW Division': 270,
      'Division One/Packerland Division': 280,
      'Northern Plains Division': 290,
      '10,000 Lakes and Southwest Division': 300,
      'Atlantic Division': 310,
      'Northern and Western Division': 320,
      'Southern Division': 330,
      'Sunrise Division': 340,
    };
    return map[deserialized];
  }
});
