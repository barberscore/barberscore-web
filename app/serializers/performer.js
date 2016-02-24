import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      contestants: {
        serialize: true
      },
      directors: {
        serialize: true
      },
      performances: {
        serialize: true
      },
      singers: {
        serialize: true
      },
    }
});
