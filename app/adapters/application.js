// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from '@ember-data/request-utils/string';

const URL_PATHS = {
  'user': 'user',
  'convention': 'convention',
  'session': 'session'
}

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  @computed('session.{data.authenticated.id_token,isAuthenticated}')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.id_token}`;
    }

    return headers;
  }

  pathForType(modelName) {
    if (URL_PATHS[modelName])
      return URL_PATHS[modelName];
    return pluralize(modelName);
  }
}
