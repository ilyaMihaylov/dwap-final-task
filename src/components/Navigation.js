import React from 'react';
import { Menu, Icon } from 'antd';

const Navigation = ({ changePanel, currentPanel }) => {
  return (
    <Menu onClick={changePanel} selectedKeys={[currentPanel]} mode='horizontal' className='navigation-panel'>
      <Menu.Item className='navigation-element' key='students'>
        <Icon type='user' />
        Students
      </Menu.Item>
      <Menu.Item className='navigation-element' key='companies'>
        <Icon type='reconciliation' />
        Companies
      </Menu.Item>
      <Menu.Item className='navigation-element' key='events'>
        <Icon type='schedule' />
        Events
      </Menu.Item>
      <Menu.Item className='navigation-element' key='contacts'>
        <Icon type='idcard' />
        Contacts
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
