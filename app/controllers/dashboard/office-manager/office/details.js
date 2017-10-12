import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  isEditing: false,
  isDisabled: not('isEditing'),
  flashMessages: service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    editOffice() {
      this.set('isEditing', true);
    },
    cancelOffice() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteOffice() {
      let office = this.model.office;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.office-manager.office', office);
      });
    },
    saveOffice() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
  },
});
