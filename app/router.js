import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('faq');

  this.route('conventions', { path: '/convention/' });
  this.route('convention', { path: '/convention/:convention_id' }, function() {
    this.route('session', { path: '/:session_id' }, function() {
      this.route('round', { path: '/:round_id' }, function() {
        this.route('performance', { path: '/:performance_id'});
      });
      this.route('contest', { path: '/:contest_id' });
    });
  });

  this.route('groups', { path: '/group/' });
  this.route('group', { path: '/group/:group_id' });
  this.route('organizations', { path: '/organization/' });
  this.route('organization', { path: '/organization/:organization_id' });
  this.route('404', { path: '/*wildcard' });
});

export default Router;
