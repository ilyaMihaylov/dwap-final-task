import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';
import EventForm from './EventForm';

export default class StudentInfo extends Component {
  render() {
    const { currentStudent, currentStudentEvents, deleteEvent } = this.props;

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
              <EventForm />
            </List.Item>
          }
          footer={<Button type='primary' shape='circle' icon='plus-circle' size='large' onClick={() => {}} />}
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
