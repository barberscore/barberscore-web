import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'entityKindSort:asc',
    'name',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),

  kindOptions: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Collegiate',
    'Youth',
  ],
  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],
  roundOptions: [
    1,
    2,
    3,
  ],

  awardOptionsProperties: [
    'nomen',
  ],

  awardOptions: Ember.computed.sort(
    'entity.parent.awards',
    'sortProperties'
  ),

  openModal: false,
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__in': '1,11,21', //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entityKindSortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityKindSortProperties'
  ),

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    createAward(){
      let award = this.get('store').createRecord('award', {
        name: this.get('name'),
        kind: this.get('kind'),
        season: this.get('season'),
        rounds: this.get('rounds'),
        is_qualifier: this.get('is_qualifier'),
        entity: this.get('entity'),
        parent: this.get('parent'),
      });
      award.save()
      .then(() => {
        this.get('flashMessages').success('Success');
        this.set('name', null);
        this.set('kind', null);
        this.set('season', null);
        this.set('rounds', null);
        this.set('is_qualifier', null);
        this.set('entity', null);
        this.set('parent', null);
        this.set('openModal', false);
        this.transitionToRoute('admin.award-manager.award.details', award);
      })
      .catch(() => {
        award.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearAward() {
        this.set('name', null);
        this.set('kind', null);
        this.set('season', null);
        this.set('rounds', null);
        this.set('is_qualifier', null);
        this.set('entity', null);
        this.set('parent', null);
      this.set('openModal', false);
    },
    deleteAward(award){
      award.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
