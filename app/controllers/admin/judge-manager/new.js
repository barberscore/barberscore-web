import Ember from 'ember';

export default Ember.Controller.extend({
  statusOptions: [
    'Active',
    'Inactive',
  ],
  kindOptions: [
    'Chair',
    'Past Chair',
    'Specialist',
    'Certified',
    'Candidate',
  ],
  categoryOptions: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
  actions: {
    cancelJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.warning('Cancelled');
      this.transitionToRoute('admin.judge-manager');
    },
    saveJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let judge = this.store.createRecord('judge', {
        person: this.person,
        status: this.status,
        kind: this.kind,
        category: this.category,
        start_date: this.start_date,
        end_date: this.end_date,
      });
      judge.save()
      // this.model.save()
      .then(() => {
        flashMessages.success('Saved');
        this.transitionToRoute('admin.judge-manager.judge', judge);
      })
      .catch((error) => {
        console.log(error);
        flashMessages.danger('Error');
      });
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
});
