import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      judges: {
        serialize: true
      },
      conventions: {
        serialize: true
      },
      roles: {
        serialize: true
      },
      panels: {
        serialize: true
      },
      picture: {
        serialize: false
      },
      common_name: {
        serialize: false
      },
      full_name: {
        serialize: false
      },
      formal_name: {
        serialize: false
      },
      first_name: {
        serialize: false
      },
      last_name: {
        serialize: false
      },
      nick_name: {
        serialize: false
      },
    }
});
