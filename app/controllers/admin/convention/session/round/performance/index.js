import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  judgeSortProperties: ['slot',],
  sortedJudges: Ember.computed.sort(
    'model.round.session.judges',
    'judgeSortProperties'
  ),

  // songOne: Ember.computed.filterBy('model.songs', 'order', 'First'),
  // songTwo: Ember.computed.filterBy('model.songs', 'order', 'Second'),
  // allSongs: this.model.get('performer.submissions.@each.chart'),
  // actions: {
  //   saveOne(subOne) {
  //     // console.log(subOne.get('chart.name'));
  //     // console.log(this.model);
  //     console.log(this.allSongs);
  //     // s1.set('chart', subOne.get('chart'));
  //     // const flashMessages = Ember.get(this, 'flashMessages');
  //     // s1.save();
  //     // .then(() => {
  //     //   flashMessages.success('Success');
  //     // })
  //     // .catch(() => {
  //     //   flashMessages.danger('Error');
  //     // });
  //   },
  //   saveTwo(subTwo) {
  //     console.log(subTwo.get('chart.name'));
  //     // song.set('chart', submission.gsubet('chart'));
  //     // const flashMessages = Ember.get(this, 'flashMessages');
  //     // song.save()
  //     // .then(() => {
  //     //   flashMessages.success('Success');
  //     // })
  //     // .catch(() => {
  //     //   flashMessages.danger('Error');
  //     // });
  //   },
  // },
});
