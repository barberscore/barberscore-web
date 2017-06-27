import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from '../config/environment';

export default EmberUploader.FileField.extend({
  flashMessages: Ember.inject.service(),
  store: Ember.inject.service(),
  filesDidChange: function(files) {
    const host = config.APP.API_HOST;
    const namespace = config.APP.API_NAMESPACE;
    const target = this.get('target');
    const model = this.get('model');
    const resource = this.get('resource');
    const uploader = EmberUploader.Uploader.create({
      url: `${host}/${namespace}/${resource}/${target}/image`,
      paramName: 'upload'
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]).then(data => {
        model.set('image', data.data.image);
      });
    }
    uploader.on('didUpload', () => {
        this.get('flashMessages').success('Uploaded!');
    });
  }
});
