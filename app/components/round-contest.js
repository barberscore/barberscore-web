import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  sortedContestsProperties: [
    'awardTreeSort',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties',
  ),
  actions: {
    saveModel(model){
      model.save();
      this.get('flashMessages').success("Saved!");
    },
  }
});
