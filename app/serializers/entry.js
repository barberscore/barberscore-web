import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    contests: {
      serialize: true
    },
    owners: {
      serialize: true
    },
    repertories: {
      serialize: true
    },
  }
});
