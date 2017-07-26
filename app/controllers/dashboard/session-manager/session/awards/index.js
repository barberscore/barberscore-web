import Ember from 'ember';

export default Ember.Controller.extend({
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  filteredAwards: Ember.computed(
    'model.convention.organization.awards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function() {
      return this.get('model.convention.organization.awards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  sortedAwards: Ember.computed.sort(
    'filteredAwards',
    'awardSortProperties',
  ),
});
