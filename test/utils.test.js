import 'babel-polyfill';
import { expect } from 'chai';
import * as utils from '../src/utils';

describe('Utils', function() {
  it('dateFormat():1483958843000默认转换为2017-01-09 18:47', function() {
    expect(utils.dateFormat(1483958843000)).to.be.equal('2017-01-09 18:47');
  });
});