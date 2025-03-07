import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    ossReport: {
      serialize: false
    },
    saReport: {
      serialize: false
    },
    legacyOss: {
      serialize: false
    },
    owners: {
      serialize: false
    },
  }
});
