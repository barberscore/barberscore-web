import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    attrs: {
      assignments: {
        serialize: true
      },
      commonName: {
        serialize: false
      },
      fullName: {
        serialize: false
      },
    }
});
