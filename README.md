# Barberscore-Web


This is the front-end website for the new Contest Manager of the Barbershop Harmony Society.  

It is based on the Ember javascript app framework.  To set up your local environment:

Install Dependencies:
  - Install Git
  - Install Node & NPM (https://nodejs.org/en/)
  - Install Watchman (optional)
  - Install PhantomJS (optional)

Install Ember globally:
  - `npm install -g ember-cli@2.14`

Clone the Repo and CD into it.

Install Barberscore-Web application:
  - `npm install`

Be sure you have the following local environment variables set:
```
API_HOST='http://localhost:8000' (or your API)
API_NAMESPACE='api' (or your API)

AUTH0_DOMAIN='barberscore-dev.auth0.com'
AUTH0_AUDIENCE='https://barberscore.auth0.com/api/v2/'
AUTH0_CLIENT_ID='C68OwqrFDjUa6lv8t4jZQPDksWmrtvoF'

BUGSNAG_API_KEY='a231990acfb72a00bf3951369ad75390'
BUGSNAG_NOTIFY_RELEASE='production,staging'
```


Finally, run `ember serve` to start the local development server.

For more details on Ember, see https://emberjs.com

Any questions?  Reach out to admin@barberscore.com
