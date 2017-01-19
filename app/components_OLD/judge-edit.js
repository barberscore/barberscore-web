import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNameBindings: ['judge.isError:danger', 'judge.hasDirtyAttributes:warning'],
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
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
  actions: {
    cancelJudge() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteJudge() {
      isCollapsed:      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.judge-manager');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveJudge() {
      isCollapsed:      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
});
