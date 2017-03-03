import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', { path: '/admin' }, function() {
    this.route('convention-manager', {path: '/convention-manager'}, function() {
      this.route('new', {path: 'new'});
      this.route('convention', { path: '/convention/:convention_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('hosts', {path: 'hosts'});
        this.route('actions', {path: 'actions'});
        this.route('assignments', { path: 'assignments'});
        this.route('sessions', { path: 'sessions'});
      });
    });
    this.route('contest-manager', {path: '/contest-manager'}, function() {
      this.route('session', { path: '/session/:session_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('contests', { path: '/contest'}, function() {
          this.route('contest', { path: '/:contest_id'});
        });
        this.route('performers', { path: '/entrant'}, function() {
          this.route('performer', { path: '/:performer_id'});
        });
        // this.route('rounds', { path: '/round'}, function() {
        //   this.route('round', { path: '/:round_id'});
        // });
        // this.route('schedules', { path: '/schedule'});
        // this.route('announcement', { path: '/announcement'});
        // this.route('oss', { path: '/oss'});
        // this.route('csa', { path: '/csa/:performer_id'});
        this.route('actions', {path: 'actions'});
      });
    });
    this.route('scoring-manager', {path: '/scoring-manager'}, function() {
      this.route('session', { path: '/session/:session_id' }, function() {
        this.route('round', {path: '/round/:round_id'}, function() {
          this.route('oa', { path: '/oa'});
        });
      });
    });
    this.route('judge-manager', {path: '/judge-manager'}, function() {
      this.route('new', { path: '/new'});
      this.route('judge', { path: '/judge/:judge_id'}, function () {
        this.route('details', {path: 'details'});
      });
    });
    this.route('quartet-manager', {path: '/quartet-manager'}, function() {
      this.route('quartet', { path: '/:group_id'}, function() {
        this.route('details', { path: '/details'});
        this.route('members', { path: '/members'});
        this.route('contests', { path: '/contests'});
      });
    });
    this.route('chorus-manager', {path: '/chorus-manager'}, function() {
      this.route('chorus', { path: '/:group_id'}, function() {
        this.route('details', {path: 'details'});
      });
    });
    this.route('organization-manager', {path: '/organization-manager'}, function() {
      this.route('organization', { path: '/organization/:entity_id'}, function () {
        this.route('details', {path: 'details'});
        this.route('awards', {path: 'awards'}, function() {
          this.route('award', { path: '/:award_id'});
        });
      });
    });
    this.route('entity-manager', {path: '/entity-manager'}, function() {
      this.route('entity', { path: '/entity/:entity_id'});
    });
    this.route('member-manager', {path: '/member-manager'}, function() {
      this.route('member', { path: '/member/:person_id'}, function() {
        this.route('details', {path: 'details'});
      });
    });
    this.route('registration-manager', {path: '/registration-manager'}, function() {
      this.route('performer', { path: '/performer/:performer_id' }, function() {
        this.route('details', {path: 'details'});
        this.route('submissions', {path: 'submissions'}, function() {
          this.route('submission', {path: '/:submission_id'});
        });
        this.route('contestants', {path: 'contestants'}, function() {
          this.route('contestant', {path: '/:contestant_id'});
        });
      });
    });
    this.route('venue-manager', {path: '/venue-manager'}, function() {
      this.route('venue', { path: '/venue/:venue_id' }, function() {
        this.route('details', {path: 'details'});
      });
    });
  });
  this.route('public', { path: '/' }, function() {
    this.route('about');
    this.route('faq');
  });
  this.route('404', { path: '/*wildcard' });
});

export default Router;
