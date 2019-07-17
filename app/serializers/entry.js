import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    contestants: {
      serialize: true
    },
    owners: {
      serialize: true
    },
  }
});
