import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('dashboard', {
    path: 'dashboard'
  }, function () {
    this.route('convention-manager', {
      path: 'convention-manager'
    }, function () {
      this.route('convention', {
        path: ':convention_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('assignments', {
          path: 'assignments'
        }, function () {
          this.route('assignment', {
            path: ':assignment_id'
          });
          this.route('new', {
            path: 'new'
          });
        });
        this.route('sessions', {
          path: 'sessions'
        }, function () {
          this.route('session', {
            path: ':session_id'
          });
          this.route('new', {
            path: 'new'
          });
        });
      });
    });
    this.route('session-manager', {
      path: 'session-manager'
    }, function () {
      this.route('session', {
        path: ':session_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('awards', {
          path: 'awards'
        }, function () {
          this.route('award', {
            path: ':award_id'
          });
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
          this.route('new', {
            path: 'new'
          });
        });
        this.route('draw', {
          path: 'draw'
        }, function () {});
      });
    });
    this.route('scoring-manager', {
      path: 'scoring-manager'
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
    this.route('judge-manager', {
      path: 'judge-manager'
    }, function () {
      this.route('judge', {
        path: ':officer_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('assignments', {
          path: 'assignments'
        });
        this.route('actions', {
          path: 'actions'
        });
      });
    });
    this.route('group-manager', {
      path: 'group-manager'
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
          this.route('new', {
            path: 'new'
          });
        });
        this.route('members', {
          path: 'members'
        }, function () {
          this.route('member', {
            path: ':member_id'
          });
          this.route('new', {
            path: 'new'
          });
        });
        this.route('repertories', {
          path: 'repertories'
        }, function () {
          this.route('repertory', {
            path: ':repertory_id'
          });
          this.route('new', {
            path: 'new'
          });
        });
      });
    });
    this.route('award-manager', {
      path: 'award-manager'
    }, function () {
      this.route('award', {
        path: ':award_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
      });
    });
    this.route('organization-manager', {
      path: 'organization-manager'
    }, function () {
      this.route('organization', {
        path: ':organization_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('awards', {
          path: 'awards'
        }, function () {
          this.route('award', {
            path: ':award_id'
          });
        });
        this.route('officers', {
          path: 'officers'
        }, function () {
          this.route('officer', {
            path: ':officer_id'
          });
        });
        this.route('conventions', {
          path: 'conventions'
        }, function () {
          this.route('convention', {
            path: ':convention_id'
          });
        });
        this.route('groups', {
          path: 'groups'
        }, function () {
          this.route('group', {
            path: ':group_id'
          });
        });
      });
    });
    this.route('person-manager', {
      path: 'person-manager'
    }, function () {
      this.route('person', {
        path: ':person_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
      });
    });
    this.route('office-manager', {
      path: 'office-manager'
    }, function () {
      this.route('office', {
        path: ':office_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('officers', {
          path: 'officers'
        });
      });
    });
    this.route('venue-manager', {
      path: 'venue-manager'
    }, function () {
      this.route('venue', {
        path: ':venue_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
      });
    });
    this.route('chart-manager', {
      path: 'chart-manager'
    }, function () {
      this.route('chart', {
        path: ':chart_id'
      });
      this.route('new', {
        path: 'new'
      });
    });
    this.route('grid-manager', {
      path: 'grid-manager'
    }, function () {
      this.route('grid', {
        path: ':grid_id'
      });
      this.route('new', {
        path: 'new'
      });
    });
  });
  this.route('about');
  this.route('tutorials');
  this.route('faq');
  this.route('404', {
    path: '/*wildcard'
  });
  this.route('rounds', {
    path: 'round'
  }, function () {
    this.route('round', {
      path: ':round_id'
    }, function () {
      this.route('details', {
        path: 'details'
      });
      this.route('appearances', {
        path: 'appearances'
      }, function () {
        this.route('appearance', {
          path: ':appearance_id'
        });
      });
      this.route('scores', {
        path: 'scores'
      }, function () {
        this.route('score', {
          path: ':appearance_id'
        });
      });
    });
  });
});

export default Router;
