import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
      img: {
        serialize: false
      },
    }
});
