import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(submission, song) {
      // console.log(song.get('chart.name'));
      console.log(submission.get('chart.name'));
      // song.set('chart', submission.get('chart'));
      // const flashMessages = Ember.get(this, 'flashMessages');
      // song.save()
      // .then(() => {
      //   flashMessages.success('Success');
      // })
      // .catch(() => {
      //   flashMessages.danger('Error');
      // });
    },
  },
  songSortProperties: ['order',],
  songsSorted: Ember.computed.sort(
    'model.songs',
    'songSortProperties'
  ),
  foos: this.model.get('performer.submissions')
});
