import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'kind',
  ],
  kind: null,
  // kind: Ember.computed(
  //   'kindOut',
  //   function(){
  //     let k = this.get('kindOut');
  //     console.log(k);
  //     let map = {
  //       'Organization': 1,
  //       'District': 11,
  //       'Noncompetitive': 12,
  //       'Affiliate': 13,
  //       'Division': 21,
  //       'Quartet': 31,
  //       'Chorus': 32,
  //       'Very Large Quartet': 33,
  //     };
  //     return map[k];
  //   }
  // ),
  sortProperties: [
    'name',
    'kind',
    'status',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  // kindOptions: [
  //   'Organization',
  //   'District',
  //   'Noncompetitive',
  //   'Affiliate',
  //   'Division',
  //   'Quartet',
  //   'Chorus',
  //   'Very Large Quartet',
  // ],
  kindOptions: [
    1,11,32
  ],
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
