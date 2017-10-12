import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  awardManager: controller('dashboard.organization-manager.organization.awards'),
  sortedItems: computed('awardManager.sortedItems'),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur - 1);
      this.transitionToRoute('dashboard.organization-manager.organization.awards.award', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur + 1);
      this.transitionToRoute('dashboard.organization-manager.organization.awards.award', newCur);
    },
    newAward() {
      let newAward = this.store.createRecord(
        'award', {
          children: [],
          contests: [],
        }
      );
      this.set('model', newAward);
      this.set('isEditing', true);
    },
    editAward() {
      this.set('isEditing', true);
    },
    cancelAward() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteAward() {
      this.model.destroyRecord()
        .then(() => {
          this.get('flashMessages').warning('Deleted');
          this.transitionToRoute('dashboard.organization-manager.organization.awards.award');
        });
    },
    saveAward() {
      this.model.save()
        .then(() => {
          this.set('isEditing', false);
          this.get('flashMessages').success('Saved');
        });
    },
  }
});
