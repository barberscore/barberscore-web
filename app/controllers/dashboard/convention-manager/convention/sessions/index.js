import { computed } from '@ember/object';
import { sort, mapBy, max } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  flashMessages: service(),
  openModal: false,
  sessionSortProperties: [
    'kindSort',
    'name:asc'
  ],
  sortedSessions: sort(
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
  allRounds: mapBy(
    'awards',
    'rounds'
  ),
  numRounds: max('allRounds'),
  awardCall: computed(function() {
    // TODO This is hack-central
    let awards = [];
    let season = {
      'Summer': 1,
      'Midwinter': 2,
      'Fall': 3,
      'Spring': 4,
      'Video': 9,
    };
    let intQual = 'true';
    if (
      (this.get('model.season') === 'Summer') || (this.get('model.season') === 'Midwinter')
    ) {
      intQual = 'false';
    }

    this.get('store').query('award', {
        'organization__name': 'International',
        'organization__kind': 1,
        'is_qualifier': intQual,
        'page_size':100,
    }).then((data) => {
      awards.addObjects(data);
    });
    this.get('store').query('award', {
        'organization': this.get('model.organization.id'),
        'season': season[this.get('model.season')],
        'page_size':100,
    }).then((data2) => {
      awards.addObjects(data2);
    });
    this.get('store').query('award', {
        'organization__parent': this.get('model.organization.id'),
        'season': season[this.get('model.season')],
        'page_size':100,
    }).then((data3) => {
      awards.addObjects(data3);
    });
    return awards;
  }),
  awardFilter: computed(
    'awardCall',
    'kind',
    function() {
      return this.get('awardCall').filterBy('kind', this.get('kind'));
    }
  ),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  awardOptions: sort(
    'awardFilter',
    'awardSortProperties'
  ),
});
