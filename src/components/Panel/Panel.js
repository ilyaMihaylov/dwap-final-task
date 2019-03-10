import React from 'react';
import Companies from './Companies/Companies';
import Contacts from './Contacts/Contacts';
import Events from './Events/Events';
import Students from './Students/Students';

const Panel = ({ currentPanel }) => {
  const panels = {
    students: Students,
    companies: Companies,
    events: Events,
    contacts: Contacts,
  };

  const events = [
    {
      id: 1,
      date: '2019-01-07',
      text: 'Собеседование',
      company: { id: 1, name: 'iTechArt' },
      student: { id: 1, name: 'Петров П.П.', spec: 'ИСиТ', group: 1, year: 2016 },
    },
    {
      id: 2,
      date: '2018-09-12',
      text: 'Стажировка',
      company: { id: 1, name: 'iTechArt' },
      student: { id: 2, name: 'Иванов И.И.', spec: 'ИСиТ', group: 1, year: 2016 },
    },
    {
      id: 3,
      date: '2018-02-07',
      text: 'Принят на работу',
      company: { id: 2, name: 'LeverX' },
      student: { id: 3, name: 'Сидоров С.С.', spec: 'ПОИТ', group: 4, year: 2016 },
    },
    {
      id: 4,
      date: '2018-04-22',
      text: 'Собеседование не прошел, плохой англ',
      company: { id: 2, name: 'LeverX' },
      student: { id: 4, name: 'Кириллов К.К.', spec: 'ПОИТ', group: 5, year: 2016 },
    },
    {
      id: 5,
      date: '2018-07-12',
      text: 'Пошел на лаб',
      company: { id: 3, name: 'iSsoft' },
      student: { id: 5, name: 'Алексеев А.А.', spec: 'ДЭВИ', group: 9, year: 2016 },
    },
    {
      id: 6,
      date: '2018-06-14',
      text: 'Посещает курсы',
      company: { id: 4, name: 'EPAM' },
      student: { id: 2, name: 'Иванов И.И.', spec: 'ИСиТ', group: 1, year: 2016 },
    },
    {
      id: 7,
      date: '2018-04-15',
      text: 'Работает полный день',
      company: { id: 4, name: 'EPAM' },
      student: { id: 6, name: 'Сергеев С.С.', spec: 'ПОИБМС', group: 7, year: 2017 },
    },
    {
      id: 8,
      date: '2017-02-25',
      text: 'Хакатон 1 место',
      company: null,
      student: { id: 7, name: 'Михайлов М.М.', spec: 'ПОИБМС', group: 8, year: 2017 },
    },
    {
      id: 9,
      date: '2017-11-30',
      text: 'Собеседование',
      company: { id: 5, name: 'IBA' },
      student: { id: 7, name: 'Михайлов М.М.', spec: 'ПОИБМС', group: 8, year: 2017 },
    },
    {
      id: 10,
      date: '2017-11-30',
      text: 'Собеседование',
      company: { id: 2, name: 'LeverX' },
      student: { id: 7, name: 'Михайлов М.М.', spec: 'ПОИБМС', group: 8, year: 2017 },
    },
  ];

  const CurrentPanel = panels[currentPanel];

  return <CurrentPanel events={events} />;
};

export default Panel;
