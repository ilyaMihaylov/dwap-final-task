import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';
import EventForm from './EventForm';

export default class StudentInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
    };

    this.hideForm = this.hideForm.bind(this);
  }

  hideForm() {
    this.setState({ isHidden: true });
  }

  showForm() {
    this.setState({ isHidden: false });
  }

  render() {
    const { isHidden } = this.state;
    const { currentStudent, currentStudentEvents, deleteEventStudent } = this.props;

    console.log(this.props);

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
              <EventForm isHidden={isHidden} hideForm={this.hideForm} showForm={this.showForm} />
              <Button
                type='primary'
                shape='circle'
                icon='plus-circle'
                size='large'
                onClick={() => {
                  this.showForm();
                }}
              />
            </List.Item>
          }
          renderItem={item => (
            <List.Item className='list-item'>
              <div className='event-buttons'>
                <Button
                  type='primary'
                  shape='circle'
                  icon='delete'
                  size='large'
                  onClick={() => {
                    deleteEventStudent(item.id, currentStudent.id);
                  }}
                />
                <Button type='primary' shape='circle' icon='edit' size='large' onClick={() => {}} />
              </div>
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
