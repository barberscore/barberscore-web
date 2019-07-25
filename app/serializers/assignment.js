import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    imageId: {
      serialize: false
    },
    commonName: {
      serialize: false
    },
  }
});
