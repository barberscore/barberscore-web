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
  // participants :[],

  // participantCall: Ember.computed(function() {
  //   let list = [];
  //   this.get('store').query('entity', {
  //     'kind': 1, // Hard-Coded
  //     'name': 'International'
  //   }).then((data) => {
  //     list.addObjects(data);
  //   });
  //   let parent = this.get('model.entity');
  //   list.addObject(parent);
  //   this.get('store').query('entity', {
  //     'kind': 21, // Hard-Coded
  //     'parent': parent.get('id')
  //   }).then((data) => {
  //     list.addObjects(data);
  //   });
  //   return list;
  // }),
  // participantSortProperties: [
  //   'kindSort:asc',
  //   'name:asc',
  // ],
  // participantOptions: Ember.computed.sort(
  //   'participantCall',
  //   'participantSortProperties'
  // ),



  // awardCall: Ember.computed(function() {
  //   let list = [];

  //   let intAwardsList = [];
  //   // this.get('store').query('entity', {
  //   //   'name': 'International',
  //   //   'kind': 1,
  //   // }).then((data) => {
  //   //   data.forEach(function(item) {
  //   //     item.get('awards').then((intAwards)=>{
  //   //       intAwards.forEach(function(intAwardsItem) {
  //   //         let awardHash = {
  //   //           id: intAwardsItem.get('id'),
  //   //           text: intAwardsItem.get('name'),
  //   //         };
  //   //         if (intAwardsItem.get('is_qualifier')) {
  //   //           intAwardsList.addObject(awardHash);
  //   //         }
  //   //       });
  //   //       let dataHash = {
  //   //         id: item.get('id'),
  //   //         text: item.get('name'),
  //   //         children: intAwardsList
  //   //       };
  //   //     list.addObject(dataHash);
  //   //     });
  //   //   });
  //   // });
  //   // this.get('store').query('entity', {
  //   //   'id': this.get('model.entity.id')
  //   // }).then((data) => {
  //   //   data.forEach(function(item) {
  //   //     item.get('awards').then((intAwards)=>{
  //   //       intAwards.forEach(function(intAwardsItem) {
  //   //         let awardHash = {
  //   //           id: intAwardsItem.get('id'),
  //   //           text: intAwardsItem.get('name'),
  //   //         };
  //   //         // if (intAwardsItem.get('is_qualifier')) {
  //   //           intAwardsList.addObject(awardHash);
  //   //         // }
  //   //       });
  //   //       let dataHash = {
  //   //         id: item.get('id'),
  //   //         text: item.get('name'),
  //   //         children: intAwardsList
  //   //       };
  //   //     list.addObject(dataHash);
  //   //     });
  //   //   });
  //   // });
  //   this.get('store').query('entity', {
  //     'id__in': this.get('model.entity.children.id')
  //   }).then((data) => {
  //     data.forEach(function(item) {
  //       item.get('awards').then((intAwards)=>{
  //         intAwards.forEach(function(intAwardsItem) {
  //           let awardHash = {
  //             id: intAwardsItem.get('id'),
  //             text: intAwardsItem.get('name'),
  //           };
  //           // if (intAwardsItem.get('is_qualifier')) {
  //             intAwardsList.addObject(awardHash);
  //           // }
  //         });
  //         let dataHash = {
  //           id: item.get('id'),
  //           text: item.get('name'),
  //           children: intAwardsList
  //         };
  //       list.addObject(dataHash);
  //       });
  //     });
  //   });
  //   // this.get('store').query('entity', {
  //   //   'pk': this.get('model.entity')
  //   // }).then((data) => {
  //   //   data.forEach(function(item) {
  //   //     item.get('awards').then((intAwards)=>{
  //   //       intAwards.forEach(function(intAwardsItem) {
  //   //         intAwardsList.addObject(intAwardsItem);
  //   //       });
  //   //       let dataHash = {
  //   //         id: item.get('id'),
  //   //         text: item.get('name'),
  //   //         children: intAwardsList
  //   //       };
  //   //     list.addObject(dataHash);
  //   //     });
  //   //   });
  //   // });




  //   // this.get('model.entity').then((data) => {
  //   //   let parentHash = {
  //   //     id: data.get('id'),
  //   //     text: data.get('name')
  //   //   };
  //   //   list.addObject(parentHash);
  //   // });
  //   // this.get('store').query('entity', {
  //   //   'kind': 21, // Hard-Coded
  //   //   'parent': this.get('model.entity.id')
  //   // }).then((data) => {
  //   //   data.forEach(function(item) {
  //   //     let childHash = {
  //   //       id: item.get('id'),
  //   //       text: item.get('name')
  //   //     };
  //   //     list.addObject(childHash);
  //   //   });
  //   // });
  //   return list;
  // }),


  awards: Ember.A(),
  awardCall: Ember.computed(function() {
    let awards = [];
    this.get('store').query('award', {
        'entity__name': 'International',
        'entity__kind': 1,
        'is_qualifier': 'true',
        // 'kind': this.get('kind'),
        // 'season': this.get('convention.season'),
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
