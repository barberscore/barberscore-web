import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: [
    'page_size',
  ],
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
      this.transitionToRoute('admin.catalog-manager.catalog.details', catalog);
    },
  }
});
