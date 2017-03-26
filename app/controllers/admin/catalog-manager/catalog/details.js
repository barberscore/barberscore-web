import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    editCatalog() {
      this.set('isEditing', true);
    },
    cancelCatalog() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteCatalog() {
      let catalog = this.model.catalog;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.catalog-manager.catalog', catalog);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveCatalog() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
