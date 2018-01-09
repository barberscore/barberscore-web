import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    contestants: {
      serialize: true
    },
    appearances: {
      serialize: true
    },
    participants: {
      serialize: true
    },
    competitor: {
      serialize: true
    },
  }
});
