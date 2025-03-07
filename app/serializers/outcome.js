import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    appearances: {
      serialize: true
    },
  }
});
