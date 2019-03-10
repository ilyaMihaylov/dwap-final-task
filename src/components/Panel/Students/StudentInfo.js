import React, { Component } from 'react';
import { List, Avatar } from 'antd';

export default class StudentInfo extends Component {
  render() {
    const { currentStudent, currentStudentEvents } = this.props;

    return (
      <div className='info'>
        <List
          itemLayout='horizontal'
          dataSource={currentStudentEvents}
          header={
            <List.Item className='list-item'>
              <List.Item.Meta
                className='list-item-meta'
                avatar={<Avatar size='large'>{currentStudent.name[0]}</Avatar>}
                title={currentStudent.name}
                description={`${currentStudent.spec}-${currentStudent.year}-${currentStudent.group}`}
              />
            </List.Item>
          }
          renderItem={item => (
            <List.Item className='list-item'>
              <List.Item.Meta
                className='list-item-meta'
                title={item.text}
                description={item.company ? `${item.company.name}, ${item.date}` : `${item.date}`}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
