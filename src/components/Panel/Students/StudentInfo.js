import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';
import EventForm from './EventForm';

export default class StudentInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      selectedEvent: null,
    };
  }

  hideForm = () => {
    this.setState({ isHidden: true });
  };

  showForm = () => {
    this.setState({ isHidden: false });
  };

  resetSelection = () => {
    this.setState({ selectedEvent: null });
  };

  render() {
    const { isHidden, selectedEvent } = this.state;
    const { currentStudent, currentStudentEvents, deleteEventStudent, addEvent, editEvent } = this.props;

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
              <EventForm
                isHidden={isHidden}
                hideForm={this.hideForm}
                showForm={this.showForm}
                addEvent={addEvent}
                currentStudent={currentStudent}
                selectedEvent={selectedEvent}
                resetSelection={this.resetSelection}
                editEvent={editEvent}
              />
              <Button
                type='primary'
                shape='circle'
                icon='plus-circle'
                size='large'
                onClick={() => {
                  this.showForm();
                  this.resetSelection();
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
                <Button
                  type='primary'
                  shape='circle'
                  icon='edit'
                  size='large'
                  onClick={() => {
                    this.showForm();
                    this.setState({ selectedEvent: item });
                  }}
                />
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
