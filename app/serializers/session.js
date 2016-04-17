import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      assistants: {
        serialize: true
      },
      contests: {
        serialize: true
      },
      judges: {
        serialize: true
      },
      performers: {
        serialize: true
      },
      rounds: {
        serialize: true
      },
    }
});
