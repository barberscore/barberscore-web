import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', { path: 'admin' }, function() {
    this.route('convention-manager', {path: 'convention-manager'}, function() {
      this.route('convention', { path: ':convention_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('actions', {path: 'actions'});
        this.route('assignments', { path: 'assignments'});
        this.route('sessions', { path: 'sessions'});
      });
    });
    this.route('session-manager', {path: 'session-manager'}, function() {
      this.route('session', { path: ':session_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('contests', { path: 'contests'}, function() {
          this.route('contest', { path: ':contest_id'});
        });
        this.route('registrations', { path: 'registrations'}, function() {
          this.route('registration', { path: ':performer_id'});
        });
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('scoring-manager', {path: 'scoring-manager'}, function() {
      this.route('round', { path: ':round_id' }, function() {
      });
    });
    this.route('judge-manager', {path: 'judge-manager'}, function() {
      this.route('judge', { path: ':officer_id'}, function () {
        this.route('details', {path: 'details'});
        this.route('assignments', {path: 'assignments'});
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('quartet-manager', {path: 'quartet-manager'}, function() {
      this.route('quartet', { path: ':entity_id'}, function() {
        this.route('details', { path: 'details'});
        this.route('members', { path: 'members'});
        this.route('registrations', { path: 'registrations'}, function() {
          this.route('registration', { path: ':performer_id'});
        });
      });
    });
    this.route('chorus-manager', {path: 'chorus-manager'}, function() {
      this.route('chorus', { path: ':entity_id'}, function() {
        this.route('details', {path: 'details'});
        this.route('details', { path: 'details'});
        this.route('members', { path: 'members'});
        this.route('registrations', { path: 'registrations'}, function() {
          this.route('registration', { path: ':performer_id'});
        });
      });
    });
    this.route('award-manager', {path: 'award-manager'}, function() {
      this.route('award', { path: ':award_id'}, function () {
        this.route('details', {path: 'details'});
      });
    });
    this.route('organization-manager', {path: 'organization-manager'}, function() {
      this.route('organization', { path: ':entity_id'}, function () {
        this.route('details', {path: 'details'});
        this.route('awards', {path: 'awards'}, function() {
          this.route('award', { path: ':award_id'});
        });
      });
    });
    this.route('member-manager', {path: 'member-manager'}, function() {
      this.route('member', { path: ':person_id'}, function() {
        this.route('details', {path: 'details'});
      });
    });
    this.route('office-manager', {path: 'office-manager'}, function() {
      this.route('office', { path: ':office_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('officers', {path: 'officers'});
      });
    });
    this.route('venue-manager', {path: 'venue-manager'}, function() {
      this.route('venue', { path: ':venue_id' }, function() {
        this.route('details', {path: 'details'});
      });
    });
    this.route('catalog-manager', {path: 'catalog-manager'}, function() {
      this.route('catalog', { path: ':catalog_id' }, function() {
        this.route('details', {path: 'details'});
      });
    });
  });
  this.route('about');
  this.route('faq');
  this.route('404', { path: '/*wildcard' });
});

export default Router;
