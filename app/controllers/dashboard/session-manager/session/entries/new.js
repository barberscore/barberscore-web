import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  searchGroup: task(function* (term){
    yield timeout(600);
    // let groups = yield this.get('store').query('group', {
    //     'nomen__icontains': term,
    //     'status': 10,
    //     'page_size': 1000,
    //   });
    // let filteredGroups = groups.filterBy('kind', this.get('model.kind'));
    // return filteredGroups
    return this.get('store').query('group', {
        'nomen__icontains': term,
        'status': 10,
        'page_size': 1000,
      });
  }),
  representingCall: Ember.computed(function() {
    return this.get('store').query('organization', {
        'kind__lt': '30',
        'page_size': 100,
      });
  }),
  representingSortProperties: [
    'orgSort:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    saveEntry(entry){
      entry.save()
      .then(() => {
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('dashboard.session-manager.session.entries.entry', entry);
      });
    },
    cancelEntry(){
      this.transitionToRoute('dashboard.session-manager.session.entries.index');
    },
    willTransition() {
      this._super(...arguments);
      const record = this.get('model');
      record.rollbackAttributes();
    },
  },
});
