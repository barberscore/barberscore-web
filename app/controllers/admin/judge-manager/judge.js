import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
  actions: {
    newJudge() {
      let newJudge = this.store.createRecord(
        'judge'
      );
      this.set('model', newJudge);
      this.set('isEditing', true);
    },
    editJudge() {
      this.set('isEditing', true);
    },
    cancelJudge() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin.judge-manager');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    saveJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
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
