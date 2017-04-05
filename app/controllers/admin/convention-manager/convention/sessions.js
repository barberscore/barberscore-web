import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  openModal: false,
  sessionSortProperties: [
    'kind',
    'name:asc'
  ],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  // Sessions
  kindOptions: [
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
  allRounds: Ember.computed.mapBy(
    'awards',
    'rounds'
  ),
  num_rounds: Ember.computed.max('allRounds'),
  awardCall: Ember.computed(function() {
    // TODO This is hack-central
    let awards = [];
    let season = {
      'Summer': 1,
      'Midwinter': 2,
      'Fall': 3,
      'Spring': 4,
      'Video': 9,
    };
    let int_qual = 'true';
    if (
      (this.get('model.season') === 'Summer') || (this.get('model.season') === 'Midwinter')
    ) {
      int_qual = 'false';
    }

    this.get('store').query('award', {
        'entity__name': 'International',
        'entity__kind': 1,
        'is_qualifier': int_qual,
        'page_size':100,
    }).then((data) => {
      awards.addObjects(data);
    });
    this.get('store').query('award', {
        'entity': this.get('model.entity.id'),
        'season': season[this.get('model.season')],
        'page_size':100,
    }).then((data2) => {
      awards.addObjects(data2);
    });
    this.get('store').query('award', {
        'entity__parent': this.get('model.entity.id'),
        'season': season[this.get('model.season')],
        'page_size':100,
    }).then((data3) => {
      awards.addObjects(data3);
    });
    return awards;
  }),
  awardFilter: Ember.computed(
    'awardCall',
    'kind',
    function() {
      return this.get('awardCall').filterBy('kind', this.get('kind'));
    }
  ),
  awardSortProperties: [
    'entityKindSort',
    'is_qualifier',
    'is_primary:desc',
    'ageSort',
    'name',
  ],
  awardOptions: Ember.computed.sort(
    'awardFilter',
    'awardSortProperties'
  ),
  actions: {
    createSession(){
      let session = this.get('store').createRecord('session', {
        convention: this.get('model'),
        kind: this.get('kind'),
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
          })
          .catch(() => {
          });
          i += 1;
        }
        this.get('flashMessages').success('Success');
        this.set('kind', null);
        this.set('age', null);
        this.set('awards', null);
        this.set('openModal', false);
        this.transitionToRoute('admin.convention-manager.convention.sessions', this.get('model'));
      })
      .catch(() => {
        session.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearSession() {
      this.set('kind', null);
      this.set('age', null);
      this.set('awards', null);
      this.set('openModal', false);
    },
    deleteSession(session){
      session.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
