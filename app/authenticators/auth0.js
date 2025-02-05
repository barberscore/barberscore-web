import OAuth2ImplicitGrant from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
import config from '../config/environment';
import auth0 from 'auth0-js';

export default class OAuth2 extends OAuth2ImplicitGrant {
  serverTokenEndpoint = `${config["ember-simple-auth"].auth0.domain}/oauth/token`;
  serverTokenRevocationEndpoint = `${config["ember-simple-auth"].auth0.domain}/revoke`;

  paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tuple
      result[key] = value;
    }
    return result;
  }

  fetchUserInfo(accessToken) {
    const url = `${config["ember-simple-auth"].auth0.domain}/userinfo`;
    return fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then((res) => {
      return res.json();
    });
  }

  authenticate = async function() {
    const webAuth = new auth0.WebAuth({
      domain: config.APP.AUTH0_DOMAIN,
      clientID: config.APP.AUTH0_CLIENT_ID,
      redirectUri: window.location.origin,
      scope: 'openid profile email',
      responseType: 'token id_token'
    });

    if (location.hash.includes("access_token=")) {
        let urlParams = new URLSearchParams(window.location.hash.replace(/^#+/, ''));
        urlParams = this.paramsToObject(urlParams)
        const profile = await this.fetchUserInfo(urlParams.access_token);
        console.log(profile);
        urlParams.profile = profile;
        return urlParams;
      } else {
        webAuth.authorize();
      }
  }

}
