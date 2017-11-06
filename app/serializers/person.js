import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      assignments: {
        serialize: true
      },
      participants: {
        serialize: true
      },
      commonName: {
        serialize: false
      },
      fullName: {
        serialize: false
      },
      formalName: {
        serialize: false
      },
      firstName: {
        serialize: false
      },
      lastName: {
        serialize: false
      },
      nickName: {
        serialize: false
      },
    }
});
