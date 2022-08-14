import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      100: 'SCJC Chair',
      110: 'SCJC Chair Past',
      120: 'SCJC ADM',
      130: 'SCJC MUS',
      140: 'SCJC PER',
      150: 'SCJC SNG',
      160: 'SCJC Chart',
      170: 'SCJC Admin',
      210: 'DRCJ',
      220: 'DRCJ Assistant',
      230: 'Contest Administrator',
      240: 'JUDGE MUS',
      250: 'JUDGE PER',
      260: 'JUDGE SNG',
      310: 'Chapter President',
      320: 'Chapter Secretary',
      330: 'Chorus Director',
      340: 'Chorus Assistant Director',
      350: 'Chorus Manager',
      410: 'Quartet Admin',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'SCJC Chair': 100,
      'SCJC Chair Past': 110,
      'SCJC ADM': 120,
      'SCJC MUS': 130,
      'SCJC PER': 140,
      'SCJC SNG': 150,
      'SCJC Chart': 160,
      'SCJC Admin': 170,
      'DRCJ': 210,
      'DRCJ Assistant': 220,
      'JUDGE PC': 225,
      'JUDGE ADM': 230,
      'JUDGE MUS': 240,
      'JUDGE PER': 250,
      'JUDGE SNG': 260,
      'Chapter President': 310,
      'Chapter Secretary': 320,
      'Chorus Director': 330,
      'Chorus Assistant Director': 340,
      'Chorus Manager': 350,
      'Quartet Admin': 410,
    };
    return map[deserialized];
  }
});
