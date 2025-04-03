// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from '@ember-data/request-utils/string';
import Inflector from 'ember-inflector';
import { uncountable } from '@ember-data/request-utils/string';
import ENV from '../config/environment';

const URL_PATHS = {
  'user': 'user',
  'convention': 'convention',
  'session': 'session',
  'entry': 'entry',
  'assignment': 'assignment',
  'contest': 'contest',
  'round': 'round'
}

uncountable('round'); //only makes call to /advice
uncountable('appearance');
uncountable('assignment');
uncountable('award');
uncountable('chart');
uncountable('contest');
uncountable('convention');
uncountable('entry');
uncountable('group');
uncountable('outcome');
uncountable('panelist');
uncountable('person');
uncountable('repertory');
uncountable('role');
uncountable('round');
uncountable('score');
uncountable('session');
uncountable('song');
uncountable('statelog');
uncountable('user');

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.APP.API_HOST,

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
