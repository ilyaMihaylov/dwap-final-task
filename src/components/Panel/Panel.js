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
  }

  deleteEvent = eventId => {
    const { events } = this.state;

    this.setState({ events: [...events].filter(event => event.id !== eventId) });
  };

  render() {
    const { currentPanel } = this.props;
    const { events } = this.state;
    const panels = {
      students: Students,
      companies: Companies,
      events: Events,
      contacts: Contacts,
    };

    const CurrentPanel = panels[currentPanel];

    return <CurrentPanel events={events} deleteEvent={this.deleteEvent} />;
  }
}
