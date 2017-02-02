import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  searchTask: task(function* (term){
    yield timeout(600);
    let kind = (this.get('model.kind') === 'Chorus') ? 32 : 31;
    return this.get('store').query('entity', {
        'nomen__icontains': term,
        'kind': kind,
        'status': 10,
        'page_size': 1000,
      })
      .then((data) => data);
  }),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    toggleCollapsed() {
      this.toggleProperty('isCollapsed');
    },
    sortPerformersBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
    penalizeEligibility(performer) {
      performer.penalizeEligibility();
    },
    addPerformer() {
      let performer = this.get('store').createRecord('performer', {
        session: this.get('model'),
        entity: this.get('entity'),
      });
      performer.save()
      .then(() => {
        this.set('entity', null);
        this.get('flashMessages').success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  },
  performerSortProperties: [
    'nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
});
