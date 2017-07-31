import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindOptions = {
      'Chorus': 32,
      'Quartet': 41,
    };
    let kindModel = this.get('model.session.kind');
    let kindInt = kindOptions[kindModel];
    let groups = yield this.get('store').query('group', {
        'nomen__icontains': term,
        'status': 10,
        'page_size': 1000,
        'kind': kindInt,
      });
    return groups
  }),
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
