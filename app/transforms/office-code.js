import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      100: 'SCJC Chair',
      110: 'SCJC Chair Past',
      120: 'SCJC CA',
      130: 'SCJC MUS',
      140: 'SCJC PER',
      150: 'SCJC SNG',
      160: 'SCJC Chart',
      170: 'SCJC Admin',
      210: 'DRCJ',
      220: 'DRCJ Assistant',
      230: 'JUDGE CA',
      240: 'JUDGE MUS',
      250: 'JUDGE PER',
      260: 'JUDGE SNG',
      310: 'CPRES',
      320: 'CSEC',
      330: 'CDIR',
      340: 'CASS',
      350: 'CMAN',
      410: 'QADM',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'SCJC Chair': 100,
      'SCJC Chair Past': 110,
      'SCJC CA': 120,
      'SCJC MUS': 130,
      'SCJC PER': 140,
      'SCJC SNG': 150,
      'SCJC Chart': 160,
      'SCJC Admin': 170,
      'DRCJ': 210,
      'DRCJ Assistant': 220,
      'JUDGE CA': 230,
      'JUDGE MUS': 240,
      'JUDGE PER': 250,
      'JUDGE SNG': 260,
      'CPRES': 310,
      'CSEC': 320,
      'CDIR': 330,
      'CASS': 340,
      'CMAN': 350,
      'QADM': 410,
    };
    return map[deserialized];
  }
});
