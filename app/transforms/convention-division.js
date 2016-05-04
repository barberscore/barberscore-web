import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      200: "EVG Division I",
      210: "EVG Division II",
      220: "EVG Division III",
      230: "EVG Division IV",
      240: "EVG Division V",
      250: "FWD Arizona Division",
      260: "FWD NE/NW Divisions",
      270: "FWD SE/SW Divisions",
      280: "LOL Division One/Packerland Divisions",
      290: "LOL Northern Plains Division",
      300: "LOL 10,000 Lakes and Southwest Divisions",
      322: "MAD Northern Division",
      324: "MAD Central Division",
      330: "MAD Southern Division",
      340: "NED Sunrise Division",
      342: "NED Western Regional",
      344: "NED Eastern Regional",
      350: "SWD NE/NW/SE/SW Divisions",
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      "EVG Division I": 200,
      "EVG Division II": 210,
      "EVG Division III": 220,
      "EVG Division IV": 230,
      "EVG Division V": 240,
      "FWD Arizona Division": 250,
      "FWD NE/NW Divisions": 260,
      "FWD SE/SW Divisions": 270,
      "LOL Division One/Packerland Divisions": 280,
      "LOL Northern Plains Division": 290,
      "LOL 10,000 Lakes and Southwest Divisions": 300,
      "MAD Northern Division": 322,
      "MAD Central Division": 324,
      "MAD Southern Division": 330,
      "NED Sunrise Division": 340,
      "NED Western Regional": 342,
      "NED Eastern Regional": 344,
      "SWD NE/NW/SE/SW Divisions": 350,
    };
    return map[deserialized];
  }
});
