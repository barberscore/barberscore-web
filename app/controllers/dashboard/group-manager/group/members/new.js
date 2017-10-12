import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  store: service(),
  searchPerson: task(function* (term){
    yield timeout(600);
    let persons = yield this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 100,
    });
    return persons;
  }),
  saveMember: task(function* (){
    try {
      yield this.get('model').save();
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.group-manager.group.members.index');
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }),
  actions: {
    clearMember() {
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.group-manager.group.members.index');
    }
  },
});
