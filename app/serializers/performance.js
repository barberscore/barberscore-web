import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      actual: {
        serialize: true
      },
      scheduled: {
        serialize: true
      },
      songs: {
        serialize: true
      },
    }
});
