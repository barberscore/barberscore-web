import Application from 'barberscore-web/app';
import config from 'barberscore-web/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start({ setupEmberOnerrorValidation: false });
setup(QUnit.assert);

start();
