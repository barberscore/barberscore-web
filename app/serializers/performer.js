import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      contestants: {
        serialize: true
      },
      performances: {
        serialize: true
      },
      submissions: {
        serialize: true
      },
      roles: {
        serialize: true
      },
    }
});
