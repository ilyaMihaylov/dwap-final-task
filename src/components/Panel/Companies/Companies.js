import React, { Component } from 'react';
import CompaniesList from './CompaniesList';
import CompanyInfo from './CompanyInfo';
import EditPanel from './EditPanel';
import { COMPANIES } from '../../../Data';

export default class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCompany: null,
      companies: COMPANIES,
    };

    this.addCompany = this.addCompany.bind(this);
    this.editCompany = this.editCompany.bind(this);
  }

  selectCompany = companyId => {
    const { companies } = this.state;

    this.setState({ currentCompany: companies.find(company => company.id === companyId) });
  };

  removeCompanyById = companyId => {
    this.setState({ companies: COMPANIES.filter(company => company.id !== companyId), currentCompany: null });
  };

  addCompany = company => {
    this.setState({
      companies: COMPANIES.concat({ ...company, id: [...COMPANIES].sort((a, b) => b.id - a.id)[0].id + 1 }),
    });
  };

  editCompany = editedCompany => {
    const { companies } = this.state;

    this.setState({
      companies: [...companies].map(company => {
        if (company.id === editedCompany.id) {
          return editedCompany;
        } else {
          return company;
        }
      }),
      currentCompany: editedCompany,
    });
  };

  render() {
    const { currentCompany, companies } = this.state;
    const { events, deleteEventCompany, addEvent, editEvent } = this.props;

    const currentCompanyEvents =
      currentCompany && events.filter(event => (event.company ? event.company.id === currentCompany.id : ''));

    return (
      <div className='panel'>
        <div className='editable-list'>
          <EditPanel
            addCompany={this.addCompany}
            removeCompanyById={this.removeCompanyById}
            editCompany={this.editCompany}
            currentCompany={currentCompany}
          />
          {companies.length ? (
            <CompaniesList companies={companies} currentCompany={currentCompany} selectCompany={this.selectCompany} />
          ) : (
            ''
          )}
        </div>
        {currentCompany && (
          <CompanyInfo
            currentCompany={currentCompany}
            currentCompanyEvents={currentCompanyEvents}
            deleteEventCompany={deleteEventCompany}
            addEvent={addEvent}
            editEvent={editEvent}
          />
        )}
      </div>
    );
  }
}
