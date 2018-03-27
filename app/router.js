import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('dashboard', {
    path: 'dashboard'
  }, function () {
    this.route('conventions', {
      path: 'convention'
    }, function () {
      this.route('convention', {
        path: ':convention_id'
      }, function() {
        this.route('details', {
          path: 'details'
        });
        this.route('assignments', {
          path: 'assignments'
        });
        this.route('grantors', {
          path: 'grantors'
        });
        this.route('sessions', {
          path: 'sessions'
        }, function() {
          this.route('session', {
            path: ':session_id'
            }, function() {
              this.route('details', {
                path: 'details'
              });
              this.route('contests', {
                path: 'contests'
              }, function () {
                this.route('contest', {
                  path: ':contest_id'
                });
              });
              this.route('entries', {
                path: 'entries'
              }, function () {
                this.route('entry', {
                  path: ':entry_id'
                });
              });
              this.route('draw', {
                path: 'draw'
              }, function () {
              });
              this.route('reports', {
                path: 'reports'
              });
              this.route('rounds', {
                path: 'rounds'
              }, function () {
                this.route('round', {
                  path: ':round_id'
                }, function () {
                  this.route('details', {
                    path: 'details'
                  });
                  this.route('panelists', {
                    path: 'panelists'
                  }, function () {
                    this.route('panelist', {
                      path: ':panelist_id'
                    });
                  });
                  this.route('competitors', {
                    path: 'competitors'
                  }, function () {
                    this.route('competitor', {
                      path: ':competitor_id'
                    });
                  });
                  this.route('appearances', {
                    path: 'appearances'
                  }, function () {
                    this.route('appearance', {
                      path: ':appearance_id'
                    });
                  });
                  this.route('contests', {
                    path: 'contests'
                  }, function () {
                    this.route('contest', {
                      path: ':contest_id'
                    });
                  });
                  this.route('advancers', {
                    path: 'advancers'
                  }, function () {});
                  this.route('finishers', {
                    path: 'finishers'
                  }, function () {});
                  this.route('standings', {
                    path: 'standings'
                  }, function () {});
                });
              });
          });
        });
      });
    });
    this.route('groups', {
      path: 'group'
    }, function () {
      this.route('group', {
        path: ':group_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('entries', {
          path: 'entries'
        }, function () {
          this.route('entry', {
            path: ':entry_id'
          });
        });
        this.route('officers', {path: 'officers'}, function () {});
        this.route('members', {path: 'members'}, function () {});
        this.route('repertories', {path: 'repertories'}, function () {});
        this.route('children', {path: 'children'}, function () {});
      });
    });
  });
  this.route('about');
  this.route('tutorials');
  this.route('faq');
  this.route('404', {
    path: '/*wildcard'
  });
});

export default Router;
