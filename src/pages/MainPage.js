import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Panel from '../components/Panel/Panel';
import '../styles/styles.scss';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPanel: 'students',
    };

    this.changePanel = this.changePanel.bind(this);
  }

  changePanel = event => {
    this.setState({ currentPanel: event.key });
  };

  render() {
    const { currentPanel } = this.state;

    return (
      <div className='main-wrapper'>
        <Navigation changePanel={this.changePanel} currentPanel={currentPanel} />
        <Panel currentPanel={currentPanel} />
      </div>
    );
  }
}
