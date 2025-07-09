import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    scores: {
      serialize: true
    },
    psaReport: {
      serialize: false
    },
    area: {
      serialize: false
    },
  }
});
