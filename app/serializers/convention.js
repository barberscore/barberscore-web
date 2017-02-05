import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      sessions: {
        serialize: true
      },
      hosts: {
        serialize: true
      },
      assignments: {
        serialize: true
      },
    }
});
