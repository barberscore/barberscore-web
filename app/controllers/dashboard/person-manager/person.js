import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import config from '../../../config/environment';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
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
});
