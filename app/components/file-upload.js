import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from '../config/environment';

export default EmberUploader.FileField.extend({
  filesDidChange: function(files) {
    const host = config.APP.API_HOST;
    const namespace = config.APP.API_NAMESPACE;
    const target = this.get('target');
    const uploader = EmberUploader.Uploader.create({
      url: `${host}/${namespace}/person/${target}/picture`,
      // url: 'http://localhost:8000/api/person/04681ad6-f976-4326-8640-61cac4f82e9f/picture',
      paramName: 'upload'
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      // uploader.upload(files[0]);
      uploader.upload(files[0]).then(() => {
        console.log('success');
      }).catch(() => {
        console.log('failure');
      });
    }
  }
});
