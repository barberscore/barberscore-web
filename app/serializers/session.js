import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      bbscoresReportNew: {
        serialize: false
      },
      drcjReportNew: {
        serialize: false
      },
      adminsReportNew: {
        serialize: false
      },
      activesReportNew: {
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
