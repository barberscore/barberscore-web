import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      110: 'BHS',
      200: 'CAR',
      205: 'CSD',
      210: 'DIX',
      215: 'EVG',
      220: 'FWD',
      225: 'ILL',
      230: 'JAD',
      235: 'LOL',
      240: 'MAD',
      345: 'NED',
      350: 'NSC',
      355: 'ONT',
      360: 'PIO',
      365: 'RMD',
      370: 'SLD',
      375: 'SUN',
      380: 'SWD',
     };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'BHS': 110,
      'CAR': 200,
      'CSD': 205,
      'DIX': 210,
      'EVG': 215,
      'FWD': 220,
      'ILL': 225,
      'JAD': 230,
      'LOL': 235,
      'MAD': 240,
      'NED': 345,
      'NSC': 350,
      'ONT': 355,
      'PIO': 360,
      'RMD': 365,
      'SLD': 370,
      'SUN': 375,
      'SWD': 380,
    };
    return map[deserialized];
  }
});
