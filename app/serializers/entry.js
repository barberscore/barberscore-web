import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    contests: {
      serialize: true
    },
    owners: {
      serialize: true
    },
  }
});
