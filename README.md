1
# Barberscore Web

This is the front-end web application that powers the new contest entry and scoring system for the [Barbershop Harmony Society](http://www.barbershop.org).  The application can be found at https://www.barberscore.com.

## Getting Started

This web application is based on [Ember.js](http://www.emberjs.com).  Here are the steps to set up your local environment.

### Prerequisites

You will need the latest versions of the following core dependencies properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [Barberscore API](https://github.com/barberscore/barberscore-api)

### Installation

* `git clone https://github.com/barberscore/barberscore-web.git` (this repo)
* `cd barberscore-web`
* `yarn install`


### Configuration

Set the following Environment Variables:

```
API_HOST=http://localhost:4200
API_PROXY_HOST=http://localhost:8000

AUTH0_DOMAIN=barberscore-dev.auth0.com
AUTH0_CLIENT_ID=C68OwqrFDjUa6lv8t4jZQPDksWmrtvoF
```

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).


### Support
Get useful information about Ember here:

* [Ember.js](https://emberjs.com/)
* [Ember CLI](https://ember-cli.com/)

If you have any questions let us know at admin@barberscore.com!
