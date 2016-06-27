import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      songs: {
        serialize: true
      },
      slot: {
        serialize: true
      },
    }
});
