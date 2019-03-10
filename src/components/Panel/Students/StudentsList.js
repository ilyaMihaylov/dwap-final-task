import React from 'react';
import { List } from 'antd';

const StudentsList = ({ students, selectStudent, currentStudent }) => {
  const studentsListItems = students.map(student => (
    <List.Item
      key={student.id}
      className={
        currentStudent ? (student.id === currentStudent.id ? 'list-item active-list-item' : 'list-item') : 'list-item'
      }
    >
      <List.Item.Meta
        className='list-item-meta'
        title={student.name}
        description={`${student.spec}`}
        onClick={() => {
          selectStudent(student.id);
        }}
      />
    </List.Item>
  ));

  return (
    <div className='list'>
      <List itemLayout='horizontal'>{studentsListItems}</List>
    </div>
  );
};

export default StudentsList;
