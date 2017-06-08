import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard', { path: 'dashboard' }, function() {
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
        this.route('entries', { path: 'entries'}, function() {
          this.route('entry', { path: ':entry_id'});
        });
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('scoring-manager', {path: 'scoring-manager'}, function() {
      this.route('round', { path: ':round_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('panelists', { path: 'panelists'}, function() {
          this.route('panelist', { path: ':panelist_id'});
        });
        this.route('appearances', { path: 'appearances'}, function() {
          this.route('appearance', { path: ':appearance_id'});
        });
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('judge-manager', {path: 'judge-manager'}, function() {
      this.route('judge', { path: ':officer_id'}, function () {
        this.route('details', {path: 'details'});
        this.route('assignments', {path: 'assignments'});
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('group-manager', {path: 'group-manager'}, function() {
      this.route('group', { path: ':entity_id'}, function() {
        this.route('details', { path: 'details'});
        this.route('entries', { path: 'entries'}, function() {
          this.route('entry', { path: ':entry_id'});
        });
        this.route('members', { path: 'members'}, function() {
          this.route('member', { path: ':member_id'});
        });
        this.route('officers', { path: 'officers'}, function() {
          this.route('officer', { path: ':officer_id'});
        });
        this.route('repertories', { path: 'repertories'}, function() {
          this.route('repertory', { path: ':repertory_id'});
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
    this.route('person-manager', {path: 'person-manager'}, function() {
      this.route('person', { path: ':person_id'}, function() {
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
    this.route('chart-manager', {path: 'chart-manager'}, function() {
      this.route('chart', { path: ':chart_id' });
    });
  });
  this.route('loop');
  this.route('about');
  this.route('faq');
  this.route('404', { path: '/*wildcard' });
});

export default Router;
