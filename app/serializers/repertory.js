import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      submissions: {
        serialize: true
      },
    }
});
