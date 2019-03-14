import React, { Component } from 'react';
import Companies from './Companies/Companies';
import Contacts from './Contacts/Contacts';
import Events from './Events/Events';
import Students from './Students/Students';
import { EVENTS } from '../../Data';

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: EVENTS,
    };

    this.deleteEventStudent = this.deleteEventStudent.bind(this);
  }

  deleteEventStudent = (eventId, studentId) => {
    const { events } = this.state;

    this.setState({
      events: [...events].map(event => {
        if (event.id === eventId && event.student.id === studentId) {
          return { ...event, student: { ...event.student, id: 0 } };
        }

        return event;
      }),
    });
  };

  editEvent = editedEvent => {
    const { events } = this.state;

    this.setState({
      events: [...events].map(event => {
        if (event.id === editedEvent.id) {
          return editedEvent;
        } else {
          return event;
        }
      }),
    });
  };

  deleteEventCompany = (eventId, companyId) => {
    const { events } = this.state;

    this.setState({
      events: [...events].map(event => {
        if (event.id === eventId && event.company.id === companyId) {
          return { ...event, company: { ...event.company, id: 0 } };
        }

        return event;
      }),
    });
  };

  addEvent = event => {
    const { events } = this.state;

    this.setState({ events: [...events].concat({ ...event, id: [...events].sort((a, b) => b.id - a.id)[0].id + 1 }) });
  };

  render() {
    const { currentPanel } = this.props;
    const { events } = this.state;

    switch (currentPanel) {
      case 'students':
        return (
          <Students
            events={events}
            deleteEventStudent={this.deleteEventStudent}
            addEvent={this.addEvent}
            editEvent={this.editEvent}
          />
        );
      case 'companies':
        return (
          <Companies
            events={events}
            deleteEventCompany={this.deleteEventCompany}
            addEvent={this.addEvent}
            editEvent={this.editEvent}
          />
        );
      case 'events':
        return <Events events={events} deleteEvent={this.deleteEvent} />;
      case 'contacts':
        return <Contacts events={events} deleteEvent={this.deleteEvent} />;
      default:
        return '';
    }
  }
}
