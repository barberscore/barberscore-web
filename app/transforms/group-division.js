import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'EVG Division I',
      20: 'EVG Division II',
      30: 'EVG Division III',
      40: 'EVG Division IV',
      50: 'EVG Division V',
      60: 'FWD Arizona',
      70: 'FWD Northeast',
      80: 'FWD Northwest',
      90: 'FWD Southeast',
      100: 'FWD Southwest',
      110: 'LOL 10000 Lakes',
      120: 'LOL Division One',
      130: 'LOL Northern Plains',
      140: 'LOL Packerland',
      150: 'LOL Southwest',
      160:  'MAD Atlantic',
      170:  'MAD Central',
      180:  'MAD Northern',
      190:  'MAD Southern',
      200:  'MAD Western',
      210: 'NED Granite and Pine',
      220:  'NED Mountain',
      230:  'NED Patriot',
      240:  'NED Sunrise',
      250:  'NED Yankee',
      260: 'SWD Northeast',
      270: 'SWD Northwest',
      280: 'SWD Southeast',
      290: 'SWD Southwest',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'EVG Division I': 10,
      'EVG Division II': 20,
      'EVG Division III': 30,
      'EVG Division IV': 40,
      'EVG Division V': 50,
      'FWD Arizona': 60,
      'FWD Northeast': 70,
      'FWD Northwest': 80,
      'FWD Southeast': 90,
      'FWD Southwest': 100,
      'LOL 10000 Lakes': 110,
      'LOL Division One': 120,
      'LOL Northern Plains': 130,
      'LOL Packerland': 140,
      'LOL Southwest': 150,
      'MAD Atlantic': 160,
      'MAD Central': 170,
      'MAD Northern': 180,
      'MAD Southern': 190,
      'MAD Western': 200,
      'NED Granite and Pine': 210,
      'NED Mountain': 220,
      'NED Patriot': 230,
      'NED Sunrise': 240,
      'NED Yankee': 250,
      'SWD Northeast': 260,
      'SWD Northwest': 270,
      'SWD Southeast': 280,
      'SWD Southwest': 290,
    };
    return map[deserialized];
  }
});
