import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      image: {
        serialize: false
      },
    }
});
