import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isCollapsed: true,
  isRoleEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isRoleDisabled: Ember.computed.not('isRoleEditing'),
  collapseChorus: false,
  isRoleCollapsed: false,
  optionsSession: Ember.computed(function() {
    return this.get('store').query('session', {'status': 4});
  }),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
    setEditing() {
      this.set('isEditing', true);
    },
    undoEditing() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEditing() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
    addEntry() {
      var entry = this.get('store').createRecord('entry', {
        session: this.get('session'),
        group: this.get('model'),
      });
      entry.save()
      .then(() => {
        this.set('group', null);
        this.get('flashMessages').success('Success');
      });
    },
  },
});
