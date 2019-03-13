import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';

export default class CompanyInfo extends Component {
  render() {
    const { currentCompany, currentCompanyEvents, deleteEvent } = this.props;

    return (
      <div className='info'>
        <List
          itemLayout='horizontal'
          dataSource={currentCompanyEvents}
          header={
            <List.Item className='list-item'>
              <List.Item.Meta
                className='list-item-meta'
                avatar={<Avatar size='large'>{currentCompany.name[0]}</Avatar>}
                title={currentCompany.name}
              />
            </List.Item>
          }
          renderItem={item => (
            <List.Item className='list-item'>
              <Button
                type='primary'
                shape='circle'
                icon='delete'
                size='large'
                onClick={() => {
                  deleteEvent(item.id);
                }}
              />
              <Button type='primary' shape='circle' icon='edit' size='large' onClick={() => {}} />
              <List.Item.Meta
                className='list-item-meta'
                title={item.student.name}
                description={`${item.text}, ${item.date}`}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
