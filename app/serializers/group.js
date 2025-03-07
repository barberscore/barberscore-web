import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    attrs: {
      imageId: {
        serialize: false
      },
      charts: {
        serialize: true
      },
    }
});
