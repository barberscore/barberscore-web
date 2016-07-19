import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['table'],
  numberOfSongs: 2,

  /**
   [ { assignment: <assignment object>,
       scores: [ <score 1>, <score 2> ]
     },
     { assignment: <assignment object>,
       scores: [ <score 1>, <score 2> ]
     }
   ]
  **/
  data: Ember.computed('assignments.[]', 'performance', function(){
    let assignments = this.get('assignments');
    let performance = this.get('performance');

    let result =  assignments.map(function(assignment) {
      return {
        assignment,
        scores: assignment.get('scores').filterBy('song.performance.id', performance.get('id'))
      };
    });

    return result;
  }),
});
