import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  searchTask: task(function* (term){
    yield timeout(600);
    let kind = (this.get('model.kind') === 'Chorus') ? 2 : 1;
    return this.get('store').query('group', {'nomen__icontains': term, 'kind': kind, 'status': 10})
      .then((data) => data);
  }),
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
    sortPerformersBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
    penalizeEligibility(performer) {
      performer.penalizeEligibility();
    },
    addPerformer() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var performer = this.get('store').createRecord('performer', {
        session: this.get('model'),
        group: this.get('group'),
      });
      performer.save()
      .then(() => {
        this.set('group', null);
        flashMessages.success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
        flashMessages.danger('Error');
      });
    },
  },
  isHeaderCollapsed: false,
  performerSortProperties: [
    'performer.performerscore.rank:asc',
    'group.nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
});
