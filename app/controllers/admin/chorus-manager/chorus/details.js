import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  location: '',
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entitySortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entitySortProperties'
  ),
  representingCall: Ember.computed(function() {
    return this.get('store').query('entity', {
        'kind__lt': '30',
        'page_size': 100,
      });
    // }).then((data) => {
    //   sessions.addObjects(data);
    // });
    // return sessions;
  }),
  // representingFilter: Ember.computed.filterBy(
  //   'representingCall',
  //   'kind',
  //   'Chorus'
  // ),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  representing: Ember.computed(
    'model.representing',
    function() {
      return this.get('model.representing');
    }
  ),
  actions: {
    editChorus() {
      this.set('isEditing', true);
    },
    cancelChorus() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteChorus() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('admin.chorus-manager');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error!');
      });
    },
    saveChorus() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.model.rollbackAttributes();
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
