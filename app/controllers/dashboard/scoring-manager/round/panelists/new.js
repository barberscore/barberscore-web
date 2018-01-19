import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  categoryOptions: [
    'DRCJ',
    'CA',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
  ],
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    savePanelist(panelist){
      panelist.save()
      .then(() => {
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('dashboard.scoring-manager.round.panelists.index');
      });
    },
    cancelPanelist(){
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.scoring-manager.round.panelists.index');
    },
    willTransition() {
      this._super(...arguments);
      const record = this.get('model');
      record.rollbackAttributes();
    },
  },
});
