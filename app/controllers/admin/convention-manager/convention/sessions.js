import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  sessionSortProperties: [
    'name:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
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
  awards: Ember.A(),
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
  // awardFilter: Ember.computed.filter(
  //   'awardCall',
  //   function(award) {
  //     return award.get('kind') === this.get('kind');
  //   }
  // ),
  awardSortProperties: [
    'kind:desc',
    'kindSort:asc',
    'name:asc',
  ],
  awardOptions: Ember.computed.sort(
    'awardCall',
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
        this.get('awards').forEach(function(award) {
          let contest = response.get('contests').createRecord({
            award: award
          });
          contest.save();
        });
        this.get('flashMessages').success('Success');
        this.set('kind', null);
        this.set('age', null);
        this.set('num_rounds', null);
      })
      .catch(() => {
        session.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
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
