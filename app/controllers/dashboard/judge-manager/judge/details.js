import { computed } from '@ember/object';
import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  isEditing: false,
  isDisabled: not('isEditing'),
  location: '',
  organizationCall: computed(function() {
    return this.get('store').query('organization', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: sort(
    'organizationCall',
    'organizationOptionsProperties'
  ),
  actions: {
    newJudge() {
      let newJudge = this.store.createRecord(
        'judge'
      );
      this.set('model', newJudge);
      this.set('isEditing', true);
    },
    editJudge() {
      this.set('isEditing', true);
    },
    cancelJudge() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteJudge() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('dashboard.judge-manager');
      });
    },
    saveJudge() {
      // TODO this seems pretty damn hacky.
      if (this.get('model.isNew')) {
        let person = this.get('currentUser.user.person');
        this.model.save()
        .then((response) => {
          let assignment = response.get('assignments').createRecord({
            person:person,
            kind: 'DRCJ'
          });
          assignment.save();
          this.model.get('assignments').pushObject(assignment);
          this.set('isEditing', false);
          this.get('flashMessages').success('Saved');
          this.transitionToRoute('dashboard.judge-manager');
        });
      } else {
        this.model.save()
        .then(() => {
          this.set('isEditing', false);
          this.get('flashMessages').success('Saved');
        });
      }
    },
    startJudge() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('judge', response);
      });
    },
    endJudge() {
      this.model.end()
      .then(response => {
        this.store.pushPayload('judge', response);
      });
    },
  }
});
