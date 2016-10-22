import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      contestantscore: {
        serialize: true
      },
    }
});
