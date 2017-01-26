import { expect } from 'chai';
import * as Utils from 'utils';

describe('格式化时间', function() {
  it('1483958843000默认转换为2017-01-09 18:47', function() {
    expect(Utils.dateFormat(1483958843000)).to.be.equal('2017-01-09 18:47');
  });
  it('1483958843000 格式："MM-dd hh:mm"转换为01-09 18:47', function() {
    expect(Utils.dateFormat(1483958843000, "MM-dd hh:mm")).to.be.equal('01-09 18:47');
  });
});