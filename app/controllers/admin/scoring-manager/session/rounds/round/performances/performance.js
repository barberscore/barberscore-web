import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  assignmentSortProperties: ['kind', 'category','slot',],
  scoringAssignments: Ember.computed.filter('model.round.session.assignments',
    function(item) {
      return item.get('category') !== 'Admin';
    }
  ),
  sortedAssignments: Ember.computed.sort(
    'scoringAssignments',
    'assignmentSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: Ember.computed.sort(
    'model.songs',
    'songSortProperties'
  ),
  performanceSortProperties: [
    'num',
  ],
  sortedItems: Ember.computed.sort(
    'model.round.performances',
    'performanceSortProperties'
  ),
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.scoring-manager.session.rounds.round.performances.performance', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.scoring-manager.session.rounds.round.performances.performance', newCur);
    },
    savePerformance() {
      this.model.save()
      .then(response => {
        response.get('songs').invoke('save');
        let foo = response.get('songs');
        foo.forEach(function(song) {
          let bar = song.get('scores');
          bar.forEach(function(score) {
            score.save();
          });
        });
        this.model.verify()
        .then(() => {
          this.get('target.router').refresh();
        });
        // .then(rs => {
        //   this.store.pushPayload('performance', rs);
        //   console.log(rs.data.id);
        //   this.store.findRecord('performance', rs.data.id).then(bat => {
        //     let baz = bat.get('songs');
        //     baz.forEach(function(song) {
        //       song.reload()
        //       .then(ps => {
        //         ns.push(ns.normalize('song', ps));
        //       });
        //     });
        //   })
        // })
        // .catch(rs => {
        //   console.log(rs);
        // });
      })
      .catch(response => {
        console.log(response);
      });
    },
    startPerformance() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    finishPerformance() {
      this.model.finish()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    completePerformance() {
      this.model.complete()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    saveActualStart(date) {
      this.model.set('actual_start', date);
      this.model.save();
    },
    saveActualFinish(date) {
      this.model.set('actual_finish', date);
      this.model.save();
    },
    penalizeRepetition(score) {
      score.penalizeRepetition();
    },
    penalizeAccompaniment(score) {
      score.penalizeAccompaniment();
    },
    penalizeContent(score) {
      score.penalizeContent();
    },
    penalizeEnhancement(score) {
      score.penalizeEnhancement();
    },
  },
});
