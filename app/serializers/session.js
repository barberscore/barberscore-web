import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    contests: {
      serialize: true
    },
    entries: {
      serialize: true
    },
  }
});
