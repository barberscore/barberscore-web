//app/helpers/env.js
import ENV from '../config/environment';
import { helper } from '@ember/component/helper';

export default helper(function env() {
    if (ENV.APP.ENVIRONMENT_NAME !== 'production') {
        return ENV.APP.ENVIRONMENT_NAME;
    }
});