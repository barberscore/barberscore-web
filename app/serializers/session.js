import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      contests: {
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
