import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    conventions: {
      serialize: true
    },
  }
});
