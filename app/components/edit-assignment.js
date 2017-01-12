import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  store: Ember.inject.service(),
  actions: {
    // saveAssignment() {
    //   const flashMessages = Ember.get(this, 'flashMessages');
    //   var assignment = this.get('store').createRecord('assignment', {
    //     session: this.get('model'),
    //     judge: this.get('judge'),
    //     kind: "Official",
    //     category: this.get('judge.category'),
    //   });
    //   assignment.save()
    //   .then(() => {
    //     this.set('judge', null);
    //     flashMessages.success("Saved");
    //   })
    //   .catch((error) => {
    //     assignment.deleteRecord();
    //     console.log(error);
    //     flashMessages.danger("Error");
    //   });
    // },
    searchAssignment(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('judge', {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  }
});
