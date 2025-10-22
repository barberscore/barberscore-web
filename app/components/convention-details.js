import Component from '@ember/component';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default Component.extend({
  session: service(),
  flashMessages: service(),

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
