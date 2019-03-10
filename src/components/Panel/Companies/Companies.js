import React, { Component } from 'react';
import CompaniesList from './CompaniesList';
import CompanyInfo from './CompanyInfo';
import EditPanel from './EditPanel';

export default class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCompany: null,
      companies: [
        { id: 1, name: 'iTechArt' },
        { id: 2, name: 'LeverX' },
        { id: 3, name: 'iSsoft' },
        { id: 4, name: 'EPAM' },
        { id: 5, name: 'IBA' },
        { id: 6, name: 'Wargaming' },
      ],
    };

    this.addCompany = this.addCompany.bind(this);
    this.editCompany = this.editCompany.bind(this);
  }

  selectCompany = companyId => {
    const { companies } = this.state;

    this.setState({ currentCompany: companies.find(company => company.id === companyId) });
  };

  removeCompanyById = companyId => {
    const { companies } = this.state;

    this.setState({ companies: [...companies].filter(company => company.id !== companyId), currentCompany: null });
  };

  addCompany = company => {
    const { companies } = this.state;

    this.setState({
      companies: [...companies].concat({ ...company, id: [...companies].sort((a, b) => b.id - a.id)[0].id + 1 }),
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
    const { events } = this.props;

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
        {currentCompany && <CompanyInfo currentCompany={currentCompany} currentCompanyEvents={currentCompanyEvents} />}
      </div>
    );
  }
}
