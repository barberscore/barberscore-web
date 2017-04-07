import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      repertories: {
        serialize: true
      },
      songs: {
        serialize: true
      },
    }
});
