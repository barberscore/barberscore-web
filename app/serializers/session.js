import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      scoresheet: {
        serialize: false
      },
      bbscores: {
        serialize: false
      },
      drcjReport: {
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
