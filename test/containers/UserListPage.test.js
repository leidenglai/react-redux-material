import React from 'react';
import { UserListPage } from 'containers/UserListPage'
import { expect } from 'chai';
import { mountComponent } from '../helpers/render.helper';

describe('UserListPage', function() {
  it('无条件时的搜索', (done) => {
    const wrapper = mountComponent(<UserListPage />);
    wrapper.find('#userListSearch').simulate('submit');
    // let counter = 0

    // const timer = setInterval(() => {
    //   if ((wrapper.find('.tableContent').find('tbody').find('tr').length > 0) || counter >= 10) {
    //     clearInterval(timer);
    //     done();
    //   } else {
    //     counter++;
    //   }
    // }, 1000);
    expect(wrapper.find('.tableContent').find('tbody').find('tr').length).to.not(0);
  });
});