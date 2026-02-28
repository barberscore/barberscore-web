//app/helpers/env.js
import ENV from '../config/environment';
import { helper } from '@ember/component/helper';

export default helper(function env() {
    return ENV.APP.ENVIRONMENT_NAME;
});