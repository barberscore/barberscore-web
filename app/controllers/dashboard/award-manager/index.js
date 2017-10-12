import { uniq, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    currentUser: service('current-user'),
    sortProperties: [
        'statusSort',
        'organizationKindSort',
        'organizationNameSort',
        'seasonSort',
        'kindSort',
        'levelSort',
        'name',
    ],
    uniqueItems: uniq(
        'model',
    ),
    sortedItems: sort(
        'uniqueItems',
        'sortProperties'
    ),
    actions: {
        createAward() {
          this.transitionToRoute('dashboard.award-manager.new');
        },
        sortBy(sortProperties) {
          this.set('sortProperties', [sortProperties]);
        },
    },
});
