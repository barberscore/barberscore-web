import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Controller.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  sortedEntriesProperties: [
    'status',
    'name',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.kind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel} OR get_kind_display:VLQ` })
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
      obj.get_owner_ids.forEach((user_id) => {
        this.store.findRecord('user', user_id).then((user) => {
          users.push(user);
        });
      })
      let entry = yield this.model.get('entries').createRecord({
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
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.set('notificationList', '');
      this.set('group', null);
      this.flashMessages.success("Created!");
      // this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries.entry', entry.get('id'));
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries');
    } catch(e) {
      this.set('createEntryModalError', true);
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }

});
