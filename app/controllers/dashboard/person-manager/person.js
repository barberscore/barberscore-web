import Ember from 'ember';
import config from '../../../config/environment';
import { task } from 'ember-concurrency';
const { get } = Ember;

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  uploadPhoto: task(function * (file) {
    try {
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const target = this.get('model.id');
      let response = yield file.upload(`${host}/${namespace}/person/${target}/image`);
      this.set('model.image', response.body.image);
      yield this.get('model').save();
      this.get('flashMessages').success("Saved!");
    } catch (e) {
      this.get('flashMessages').danger("Upload Failed!");
    }
  }).drop(),
  actions: {
    uploadImage(file) {
      get(this, 'uploadPhoto').perform(file);
    }
  }
});
