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

  deleteEventCompany = (eventId, companyId) => {
    const { events } = this.state;

    this.setState({
      events: [...events].map(event => {
        if (event.id === eventId && event.company.id === companyId) {
          return { ...event, student: { ...event.student, id: 0 } };
        }

        return event;
      }),
    });
  };

  render() {
    const { currentPanel } = this.props;
    const { events } = this.state;

    switch (currentPanel) {
      case 'students':
        return <Students events={events} deleteEventStudent={this.deleteEventStudent} />;
      case 'companies':
        return <Companies events={events} deleteEventCompany={this.deleteEventCompany} />;
      case 'events':
        return <Events events={events} deleteEvent={this.deleteEvent} />;
      case 'contacts':
        return <Contacts events={events} deleteEvent={this.deleteEvent} />;
      default:
        return '';
    }
  }
}
