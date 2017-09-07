import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  awardManager: Ember.inject.controller('dashboard.organization-manager.organization.awards'),
  sortedItems: Ember.computed('awardManager.sortedItems'),
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
