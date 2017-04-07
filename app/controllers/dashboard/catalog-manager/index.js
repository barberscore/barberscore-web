import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: [
    'page_size',
  ],
  openModal: false,
  page_size: 100,
  sortProperties: [
    'title',
    'bhs_id',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  searchCatalog: task(function* (term){
    yield timeout(600);
    return this.get('store').query('catalog', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    transitionCatalog(catalog) {
      this.transitionToRoute('dashboard.catalog-manager.catalog.details', catalog);
    },
    createCatalog(){
      let catalog = this.get('store').createRecord('catalog', {
        title: this.get('title'),
        arrangers: this.get('arrangers'),
        composers: this.get('composers'),
        holders: this.get('holders'),
      });
      catalog.save()
      .then(() => {
        this.set('title', null);
        this.set('arrangers', null);
        this.set('composers', null);
        this.set('holders', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('dashboard.catalog-manager.catalog.details', catalog);
      })
      .catch(() => {
        catalog.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearCatalog() {
      this.set('title', null);
      this.set('arrangers', null);
      this.set('composers', null);
      this.set('holders', null);
      this.set('openModal', false);
    },
    deleteCatalog(catalog){
      catalog.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
