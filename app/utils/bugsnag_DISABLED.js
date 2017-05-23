import Ember from 'ember';

const {
  getProperties
} = Ember;

export function getUser(owner) {
  const currentUser = owner.lookup('service:current-user').get('user');
  const {
    email,
    id,
    name
  } = getProperties(currentUser, 'email', 'id', 'name');

  return {
    email,
    id,
    name
  };
}
