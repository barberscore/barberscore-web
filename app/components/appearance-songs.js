import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  chartsList: computed(
    'model',
    'charts',
    function() {
      let repertory = this.get('model.charts');
      let charts = [];

      for (var i = repertory.length - 1; i >= 0; i--) {
        let chart = JSON.parse(repertory[i]);
        chart['songTitle'] = chart.title;
        charts.push(chart);
      }
      return charts.sortBy('title');
    }
  ),
  autosave: task(function* (song, chart){
    song.set('chartId', chart.pk);
    song.set('title', chart.songTitle);
    song.set('arrangers', chart.arrangers);
    try {
      yield song.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
