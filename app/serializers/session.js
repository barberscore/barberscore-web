import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      bbscoresReport: {
        serialize: false
      },
      drcjReport: {
        serialize: false
      },
      adminsReport: {
        serialize: false
      },
      activesReport: {
        serialize: false
      },
      contests: {
        serialize: true
      },
      entries: {
        serialize: true
      },
      rounds: {
        serialize: true
      },
    }
});
