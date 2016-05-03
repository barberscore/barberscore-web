import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'International',
      20: 'District',
      // 30: 'Division',
      // 40: 'District and Division',
      200: "Division I",
      210: "Division II",
      220: "Division III",
      230: "Division IV",
      240: "Division V",
      250: "Arizona Division",
      260: "NE/NW Divisions",
      270: "SE/SW Divisions",
      280: "Division One/Packerland Divisions",
      290: "Northern Plains Division",
      300: "10,000 Lakes and Southwest Divisions",
      322: "Northern Division",
      324: "Central Division",
      330: "Southern Division",
      340: "Sunrise Division",
      342: "Western Regional",
      344: "Eastern Regional",
      350: "NE/NW/SE/SW Divisions",
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 10,
      'District': 20,
      // 'Division': 30,
      // 'District and Division': 40,
      "Division I": 200,
      "Division II": 210,
      "Division III": 220,
      "Division IV": 230,
      "Division V": 240,
      "Arizona Division": 250,
      "NE/NW Divisions": 260,
      "SE/SW Divisions": 270,
      "Division One/Packerland Divisions": 280,
      "Northern Plains Division": 290,
      "10,000 Lakes and Southwest Divisions": 300,
      "Northern Division": 322,
      "Central Division": 324,
      "Southern Division": 330,
      "Sunrise Division": 340,
      "Western Regional": 342,
      "Eastern Regional": 344,
      "NE/NW/SE/SW Divisions": 350,
    };
    return map[deserialized];
  }
});
