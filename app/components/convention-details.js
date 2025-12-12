import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Component.extend({
  session: service(),
  flashMessages: service(),
  store: service(),

  init() {
    this._super(...arguments);
    this.loadSessions();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.loadSessions();
  },

  async loadSessions() {
    if (this.model && this.model.id) {
      try {
        const sessions = await this.store.query('session', {
          filter: {
            'convention_id': this.model.id,
          }
        });
        this.set('conventionSessions', sessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
        this.set('conventionSessions', []);
      }
    }
  },

  isSuperAdmin: computed('session.data.authenticated.profile', function() {
    const profile = this.get('session.data.authenticated.profile');
    if (!profile) {
      return false;
    }
    const roles = profile['https://www.barberscore.com/roles'] || [];
    return roles.includes('BS Admin');
  }),

  allSessionsInSyncableState: computed('conventionSessions.[]', 'conventionSessions.@each.status', function() {
    const sessions = this.get('conventionSessions') || [];
    if (sessions.length === 0) {
      return false;
    }
    const validStatuses = ['Verified', 'Packaged', 'Finished'];
    return sessions.every(session => {
      const status = session.get('status');
      return validStatuses.includes(status);
    });
  }),

  canShowSyncButton: computed('isSuperAdmin', 'allSessionsInSyncableState', function() {
    return this.get('isSuperAdmin') || this.get('allSessionsInSyncableState');
  }),

  actions: {
    async syncFromProd(convention) {
      try {
        const headers = {};
        if (this.session.isAuthenticated) {
          headers['Authorization'] = `Bearer ${this.session.data.authenticated.id_token}`;
        }
        headers['Content-Type'] = 'application/json';

        const response = await fetch(`${ENV.APP.API_HOST}/bhs/convention/${convention.id}/sync`, {
          method: 'POST',
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.flashMessages.success('Convention synced from production successfully!');
      } catch (error) {
        this.flashMessages.danger('Failed to sync convention from production. Please try again.');
        console.error('Sync error:', error);
      }
    }
  }
});
