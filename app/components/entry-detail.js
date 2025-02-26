import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  membersCollapsed: true,
  officersCollapsed: true,
  repertoriesCollapsed: true,
  logsCollapsed: true,
  contests: [],
  sortedEntries: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setContests();
    this.setGroup();
    this.setEntries();
  },
  setContests: function() {
    const that = this;
    this.get('model.session.contests').then(function(contests) {
      contests = contests.map(function(contest) {
        return contest;
      });
      that.set('contests', contests);
    });
  },
  setGroup: function() {
    const that = this;
    this.store.findRecord('group', this.model.get('groupId'))
      .then(function(res) {
        console.log(res);
        that.set('group', res);
      });
  },
  setEntries: function() {
    const that = this;
    this.get('model.session.entries').then(function(entries) {
      entries = entries.toSorted(function(a, b) {
        return a.name < b.name ? -1 : 1;
      });
      that.set('sortedEntries', entries);
    });
  },
  autosave: task(function* (property, value){
    this.model.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
