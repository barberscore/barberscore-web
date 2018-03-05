import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  deletePanelistModal: false,
  deletePanelistModalError: false,
  deletePanelist: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deletePanelistModal', false);
      this.set('deletePanelistModalError', false);
      this.get('flashMessages').success("Deleted!");
      this.transitionToRoute('dashboard.scoring-manager.round.panelists.index');
    } catch(e) {
      this.set('deletePanelistModalError', true);
    }
  }).drop(),
});
