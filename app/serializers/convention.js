import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      sessions: {
        serialize: true
      },
      assignments: {
        serialize: true
      },
    }
});
