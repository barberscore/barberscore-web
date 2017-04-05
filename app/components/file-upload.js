import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from '../config/environment';

export default EmberUploader.FileField.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  filesDidChange: function(files) {
    const host = config.APP.API_HOST;
    const namespace = config.APP.API_NAMESPACE;
    const target = this.get('target');
    const resource = this.get('resource');
    const uploader = EmberUploader.Uploader.create({
      url: `${host}/${namespace}/${resource}/${target}/picture`,
      paramName: 'upload'
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    }
    uploader.on('didUpload', e => {
        this.get('flashMessages').success('Uploaded - CLICK SAVE TO SEE NEW IMAGE', {
          timeout: 7000,
        });
    });
  }
});
