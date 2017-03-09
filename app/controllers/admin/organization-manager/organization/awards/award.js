import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isWrite: Ember.computed.not('model.permissions.write'),
  // searchTask: task(function* (term){
  //   yield timeout(600);
  //   return this.get('store').query('person', {'nomen__icontains': term})
  //     .then((data) => data);
  // }),
  awardSortProperties: [
    'is_primary:desc',
    'name:asc',
    'kindOptions',
  ],
  sortedItems: Ember.computed.sort(
    'model.entity.awards',
    'awardSortProperties'
  ),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('admin.organization-manager.organization.awards.award', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('admin.organization-manager.organization.awards.award', newCur);
    },
    newAward() {
      let newAward = this.store.createRecord(
        'award'
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
        this.transitionToRoute('admin.organization-manager.organization.awards.award');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error!');
      });
    },
    saveAward() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((failure) => {
        this.model.rollbackAttributes();
        this.get('flashMessages').danger(failure);
      });
    },
  }
});
