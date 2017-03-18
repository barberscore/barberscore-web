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
  plugins: 'checkbox',
  participants :[],
  participantCall: Ember.computed(function() {
    let list = [];



    let intAwardsList = [];
    this.get('store').query('entity', {
      'kind': 1, // Hard-Coded
      'short_name': 'BHS'
    }).then((data) => {
      data.forEach(function(item) {
        item.get('awards').then((intAwards)=>{
          intAwards.forEach(function(intAwardsItem) {
            let intAwardsHash = {
              id: intAwardsItem.get('id'),
              text: intAwardsItem.get('name')
            };
            intAwardsList.addObject(intAwardsHash);
          });
          let dataHash = {
            id: item.get('id'),
            text: item.get('name'),
            children: intAwardsList
          };
        list.addObject(dataHash);
        });
      });
    });




    // this.get('model.entity').then((data) => {
    //   let parentHash = {
    //     id: data.get('id'),
    //     text: data.get('name')
    //   };
    //   list.addObject(parentHash);
    // });
    // this.get('store').query('entity', {
    //   'kind': 21, // Hard-Coded
    //   'parent': this.get('model.entity.id')
    // }).then((data) => {
    //   data.forEach(function(item) {
    //     let childHash = {
    //       id: item.get('id'),
    //       text: item.get('name')
    //     };
    //     list.addObject(childHash);
    //   });
    // });
    return list;
  }),

  participantSortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  participantOptions: Ember.computed.sort(
    'participantCall',
    'participantSortProperties'
  ),
  actions: {
    createSession(){
      let session = this.get('store').createRecord('session', {
        convention: this.get('model'),
        kind: this.get('kind'),
        age: this.get('age'),
        num_rounds: this.get('num_rounds'),
        participants: this.get('participants'),
      });
      session.save()
      .then(() => {
        this.set('kind', null);
        this.set('age', null);
        this.set('num_rounds', null);
        this.set('participants', null);
        this.get('flashMessages').success('Success');
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
