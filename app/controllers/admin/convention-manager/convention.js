import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  // Sessions
  openSessionModal: false,
  kindSessionOptions: [
    'Quartet',
    'Chorus',
  ],
  ageOptions: [
    'All',
    'Seniors',
    'Youth',
  ],
  numOptions: [
    1,
    2,
    3,
  ],
  booleanOptions: [
    true,
  ],
  awardCall: Ember.computed(function() {
    let awards = [];
    this.get('store').query('award', {
        'entity__name': 'International',
        'entity__kind': 1,
        'is_qualifier': 'true',
    }).then((data) => {
      awards.addObjects(data);
    });
    this.get('store').query('award', {
        'entity': this.get('model.entity.id')
    }).then((data2) => {
      awards.addObjects(data2);
    });
    this.get('store').query('award', {
        'entity__parent': this.get('model.entity.id')
    }).then((data3) => {
      awards.addObjects(data3);
    });
    return awards;
  }),
  awardFilter: Ember.computed(
    'awardCall',
    'kindSession',
    function() {
      return this.get('awardCall').filterBy('kind', this.get('kindSession'));
    }
  ),
  awardSortProperties: [
    'kind:desc',
    'kindSort:asc',
    'name:asc',
  ],
  awardOptions: Ember.computed.sort(
    'awardFilter',
    'awardSortProperties'
  ),
  // Assignments
  openAssignmentModal: false,
  adminCall: Ember.computed(function() {
    return this.get('store').query('person', {
      'officers__office__kind': 1, //TODO Hardcoded
      // 'judges__status': 1,
      // 'judges__kind': 40,
      'page_size': 1000,
    });
  }),
  adminUniques: Ember.computed.uniq(
    'adminCall'
  ),
  adminSortProperties: [
    'last_name:asc',
    'first_name:asc',
  ],
  adminOptions: Ember.computed.sort(
    'adminUniques',
    'adminSortProperties'
  ),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000,
    })
      .then((data) => data);
  }),
  kindAssignmentOptions: [
    'DRCJ',
    'CA',
    'ACA',
    'Music',
    'Presentation',
    'Singing',
  ],
  actions: {
    createSession(){
      let session = this.get('store').createRecord('session', {
        convention: this.get('model'),
        kind: this.get('kindSession'),
        age: this.get('age'),
        num_rounds: this.get('num_rounds'),
      });
      session.save()
      .then((response) => {
        // TODO Recover from failure.
        this.get('awards').forEach(function(award) {
          let contest = response.get('contests').createRecord({
            award: award
          });
          contest.save();
        });
        let i = 1;
        let t = this.get('num_rounds');
        while (i <= t) {
          // TODO Transform before sending. MUST be a better way.
          let map = {
            1: 'Finals',
            2: 'Semi-Finals',
            3: 'Quarter-Finals',
          };
          let k = map[(t - i) + 1];
          let round = response.get('rounds').createRecord({
            num: i,
            kind: k
          });
          round.save()
          .then(() => {
            this.get('flashMessages').success('Success');
          })
          .catch(() => {
            this.get('flashMessages').danger('Error');
          });
          i += 1;
        }
        this.get('flashMessages').success('Success');
        this.set('kindSession', null);
        this.set('age', null);
        this.set('num_rounds', null);
        this.set('awards', null);
        this.set('openSessionModal', false);
        this.transitionToRoute('admin.convention-manager.convention.sessions', this.get('model'));
      })
      .catch(() => {
        session.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearSessionForm() {
      this.set('kindSession', null);
      this.set('age', null);
      this.set('num_rounds', null);
      this.set('awards', null);
      this.set('openSessionModal', false);
    },
    createAssignment(){
      let assignment = this.get('store').createRecord('assignment', {
        convention: this.get('model'),
        person: this.get('person'),
        kind: this.get('kindAssignment'),
      });
      assignment.save()
      .then(() => {
        this.set('person', null);
        this.set('kindAssignment', null);
        this.get('flashMessages').success('Success');
        this.set('openAssignmentModal', false);
        this.transitionToRoute('admin.convention-manager.convention.assignments', this.get('model'));
      })
      .catch(() => {
        assignment.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearAssignmentForm() {
      this.set('person', null);
      this.set('kindAssignment', null);
      this.set('openAssignmentModal', false);
    },
  }
});
