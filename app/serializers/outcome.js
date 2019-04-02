import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    contenders: {
      serialize: true
    },
  }
});
