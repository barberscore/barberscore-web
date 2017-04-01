import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  searchCatalog: task(function* (term){
    yield timeout(600);
    return this.get('store').query('catalog', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  performerSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.performers',
    'performerSortProperties'
  ),
  submissionSortProperties: [
    'title',
  ],
  sortedSubmissions: Ember.computed.sort(
    'model.submissions',
    'submissionSortProperties'
  ),
  contestSortProperties: [
    'nomen',
  ],
  contestOptions: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
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
  //   'Quartet'
  // ),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  actions: {
    populateSubmission(catalog) {
      this.set('catalog', catalog);
      this.set('title', catalog.get('title'));
      this.set('composers', catalog.get('composers'));
      this.set('arrangers', catalog.get('arrangers'));
      this.set('holders', catalog.get('holders'));
      this.set('bhs_id', catalog.get('bhs_id'));
    },
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('admin.contest-manager.session.performers.performer', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('admin.contest-manager.session.performers.performer', newCur);
    },
    editPerformer() {
      this.set('isEditing', true);
    },
    cancelPerformer() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deletePerformer() {
      let session = this.model.session;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.contest-manager.convention.sessions.session', session);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    savePerformer() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    buildPerformer() {
      this.model.build();
    },
    scratchPerformer() {
      this.model.scratch();
    },
    disqualifyPerformer() {
      this.model.disqualify();
    },
    updateSelection(newSelection, value, operation) {
      if (operation==='added') {
        let contestant = this.get('model.contestants').createRecord({
          contest: value
        });
        contestant.save()
        .then(() => {
        })
        .catch(() => {
          this.get('flashMessages').danger('Error');
        });
      } else { //operation === removed
        let contestant = this.get('model.contestants').findBy('contest.id', value.get('id'));
        contestant.destroyRecord()
        .then(() => {
        })
        .catch(() => {
          this.get('flashMessages').danger('Error');
        });
      }
    },
    deleteSubmission(submission) {
      submission.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    createSubmission() {
      let submission = this.get('store').createRecord('submission', {
        performer: this.get('model'),
        title: this.get('title'),
        composers: this.get('composers'),
        arrangers: this.get('arrangers'),
        holders: this.get('holders'),
        bhs_id: this.get('bhs_id'),
        catalog: this.get('catalog'),
      });
      submission.save()
      .then(() => {
        this.set('submission', null);
        this.set('title', null);
        this.set('composers', null);
        this.set('arrangers', null);
        this.set('holders', null);
        this.set('bhs_id', null);
        this.set('catalog', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    clearSubmission() {
      this.set('submission', null);
      this.set('title', null);
      this.set('composers', null);
      this.set('arrangers', null);
      this.set('holders', null);
      this.set('bhs_id', null);
      this.set('catalog', null);
      this.set('openModal', false);
    }
  },
});
