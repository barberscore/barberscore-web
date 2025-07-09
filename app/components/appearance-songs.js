import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: null,
  didReceiveAttrs: function() {
    this.setSongs();
  },
  setSongs: function() {
    const that = this;
    this.get('model.songs').then(function(songs) {
      const updatedSongs = songs.toSorted(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedSongs', updatedSongs);
    });
  },
  chartsList: computed(
    'model',
    'charts',
    {
      get() {
        if (this._charts) {
          return this._charts;
        }

        let repertory = this.get('model.charts');
        let charts = [];

        for (var i = repertory.length - 1; i >= 0; i--) {
          let chart = JSON.parse(repertory[i]);
          chart['songTitle'] = chart.title;
          charts.push(chart);
        }

        // Sort charts list in alphabetical order
        charts = charts.sort(function(a, b) {
          return a.title.localeCompare(b.title);
        });

        // Fallback option
        const unknownChart = {
          title: 'Song not in Repertory',
          arrangers: '',
          pk: null,
          songTitle: 'Song not in Repertory',
        }
        charts.push(unknownChart);
        return charts
      },

      set(key, value) {
        return this._charts = value;
      }

    }
  ),
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
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
