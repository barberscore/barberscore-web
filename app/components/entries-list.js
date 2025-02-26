import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setSortedEntries();
  },
  sortedEntries: [],
  setSortedEntries: function() {
    const that = this;
    this.get('model.entries').then(function(entries) {
      entries = entries.toSorted(function(a, b) {
        if (a.status != b.status)
          return a.status < b.status ? -1 : 1;
        return a.name < b.name ? -1 : 1;
      });
      that.set('sortedEntries', entries);
    });
  },
  searchGroup: task(function* (term){
    console.log("Searching groups");
    yield timeout(600);
    let kindModel = this.get('model.kind');
    let res = yield this.algolia.search({ indexName: 'Group', query: term}) //, { filters: `get_kind_display:${kindModel} OR get_kind_display:VLQ` })
    return res.hits
  }),
  validateEmails: function(emailList){
    var emails = emailList.replace(/\s/g,'').split(",");
    var valid = true;
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (var i = 0; i < emails.length; i++) {
        if( emails[i] == "" || ! regex.test(emails[i])){
            valid = false;
        }
    }
    return valid;
  },
  createEntryModal: false,
  createEntryModalError: false,
  createEntryModalSuccessMessage: "",
  selectGroupModalError: false,
  notificationListModalError: false,
  notificationList: null,
  saveEntry: task(function* (obj, notificationList){
    try {
      if (notificationList == null || notificationList.length == 0 || !this.validateEmails(notificationList)) {
        this.set('notificationListModalError', true);
      } else {
        this.set('notificationListModalError', false);
      }

      if (obj === undefined) {
        this.set('selectGroupModalError', true);
      } else {
        this.set('selectGroupModalError', false);
      }

      if (this.get('notificationListModalError') || this.get('selectGroupModalError')) {
        throw 'An error occurred.';
      } else {
        this.set('createEntryModalError', false);
      }

      let users = [];
      const that = this;
      yield obj.get_owner_ids.forEach(async function(user_id){
        await that.store.findRecord('user', user_id).then((user) => {
          users.push(user);
        });
      })
      console.log(this.get('model.id'));
      let entry = yield this.store.createRecord('entry', {
        session: this.get('model'),
        groupId: obj.objectID,
        name: obj.name,
        kind: obj.get_kind_display,
        gender: obj.get_gender_display,
        district: obj.get_district_display,
        division: obj.get_division_display,
        participants: obj.participants,
        chapters: obj.chapters,
        notificationList: notificationList,
        image: obj.image_url,
        bhsId: (obj.bhs_id ? obj.bhs_id : obj.code),
        code: obj.code,
        repertories: [],
        owners: users,
      }).save();
      let p = yield entry.create_manual_entry({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload(p);
      this.set('createEntryModalError', false);
      this.set('notificationList', '');
      this.set('group', null);
      this.flashMessages.success("Created!");
      this.set('createEntryModalSuccessMessage', "A Draw must be assigned for this entry prior to building a round.");
      // this.set('createEntryModal', false);

      // this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries');
      this.get('dashboard.conventions.convention.sessions.session.entries').reload();
    } catch(e) {
      console.error(e);
      this.set('createEntryModalError', true);
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    }
  }
});
