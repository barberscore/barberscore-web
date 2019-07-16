import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    songs: {
      serialize: true
    },
    owners: {
      serialize: false
    },
    varianceReport: {
      serialize: false
    },
    csaReport: {
      serialize: false
    },
  }
});
