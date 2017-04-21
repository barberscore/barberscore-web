import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  uniques: Ember.computed.uniq(
    'model'
  ),
  openModal: false,
  sortProperties: [
    'start_date:asc',
    'end_date:asc',
  ],
  sortedConventions: Ember.computed.sort(
    'uniques',
    'sortProperties'
  ),
  kindOptions: [
    'International',
    'District',
    'Division',
    'District and Division',
  ],
  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],

  panelOptions: [
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintiple',
  ],

  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entityOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityOptionsProperties'
  ),
  riserOptions: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],
  location: '',

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    createConvention() {
      // TODO this seems pretty damn hacky.
      let convention = this.get('store').createRecord('convention', {
        name: this.get('name'),
        entity: this.get('entity'),
        location: this.get('location'),
        start_date: this.get('start_date'),
        end_date: this.get('end_date'),
        kind: this.get('kind'),
        season: this.get('season'),
        panel: this.get('panel'),
        risers: this.get('risers'),
      });
      convention.save()
      .then((response) => {
        let assignment = response.get('assignments').createRecord({
          person: this.get('currentUser.user.person'),
          kind: 'DRCJ'
        });
        assignment.save();
        convention.get('assignments').pushObject(assignment);
        this.get('flashMessages').success('Saved');
        this.set('name', null);
        this.set('entity', null);
        this.set('location', null);
        this.set('start_date', null);
        this.set('end_date', null);
        this.set('kind', null);
        this.set('season', null);
        this.set('panel', null);
        this.set('risers', null);
        this.set('openModal', false);
        this.transitionToRoute('dashboard.convention-manager.convention.details', convention);
      });
    },
    clearForm() {
      this.set('name', null);
      this.set('entity', null);
      this.set('location', null);
      this.set('start_date', null);
      this.set('end_date', null);
      this.set('kind', null);
      this.set('season', null);
      this.set('panel', null);
      this.set('risers', null);
      this.set('openModal', false);
    },
  }
});
