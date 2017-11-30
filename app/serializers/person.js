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
    }
});
