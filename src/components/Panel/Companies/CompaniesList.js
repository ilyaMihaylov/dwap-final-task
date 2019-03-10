import React from 'react';
import { List } from 'antd';

const CompaniesList = ({ companies, selectCompany, currentCompany }) => {
  const companiesListItems = companies.map(company => (
    <List.Item
      key={company.id}
      className={
        currentCompany ? (company.id === currentCompany.id ? 'list-item active-list-item' : 'list-item') : 'list-item'
      }
    >
      <List.Item.Meta
        className='list-item-meta'
        title={company.name}
        onClick={() => {
          selectCompany(company.id);
        }}
      />
    </List.Item>
  ));

  return (
    <div className='list'>
      <List itemLayout='horizontal'>{companiesListItems}</List>
    </div>
  );
};

export default CompaniesList;
