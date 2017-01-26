import React from 'react';
import { UserListPage } from 'containers/UserListPage'
import { expect } from 'chai';
import { mountComponent } from '../helpers/render.helper';
let wrapper;
before(() => {
  wrapper = mountComponent(<UserListPage />);
});
describe('UserListPage', function() {
  it('用户昵称输入', () => {
    const inputNickname = wrapper.find('[name="nickname"]');

    inputNickname.simulate('change', { target: { value: 'Resin' } });

    expect(wrapper.state('nickname')).to.equal('Resin');
    expect(input.prop('value')).to.equal('Resin');
  });
});