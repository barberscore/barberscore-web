import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    songs: {
      serialize: true
    },
    owners: {
      serialize: true
    },
    varianceReport: {
      serialize: false
    },
    csaReport: {
      serialize: false
    },
  }
});
