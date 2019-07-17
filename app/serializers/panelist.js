import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    scores: {
      serialize: true
    },
    psaReport: {
      serialize: false
    },
    representing: {
      serialize: false
    },
  }
});
