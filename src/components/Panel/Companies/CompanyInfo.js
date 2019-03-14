import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';
import EventForm from './EventForm';

export default class CompanyInfo extends Component {
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
    const { currentCompany, currentCompanyEvents, deleteEventCompany, addEvent, editEvent } = this.props;

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
              <EventForm
                isHidden={isHidden}
                hideForm={this.hideForm}
                showForm={this.showForm}
                addEvent={addEvent}
                currentCompany={currentCompany}
                selectedEvent={selectedEvent}
                editEvent={editEvent}
                resetSelection={this.resetSelection}
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
                    deleteEventCompany(item.id, currentCompany.id);
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
