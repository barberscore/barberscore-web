import Component from '@ember/component';
// import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  member: null,
  // store: service(),
//   searchMember: task(function* (term){
//     yield timeout(600);
//     let members = yield this.get('model').query('person', {
//       'nomen__icontains': term,
//       'page_size': 100,
//     });
//     return persons;
//   }),
  makeAdmin: task(function* (member){
    member.set('isAdmin', true);
    yield timeout(1000);
    try {
      yield member.save();
      this.set('member', null);
      this.get('flashMessages').success("Saved");
    } catch(e) {
      this.set('member', null);
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});
