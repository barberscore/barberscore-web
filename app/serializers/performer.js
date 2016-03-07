import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      contestants: {
        serialize: true
      },
      roles: {
        serialize: true
      },
      performances: {
        serialize: true
      },
    }
});
