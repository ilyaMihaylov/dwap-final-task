import React, { Component } from 'react';
import StudentsList from './StudentsList';
import StudentInfo from './StudentInfo';
import EditPanel from './EditPanel';
import { STUDENTS } from '../../../Data';

export default class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: null,
      students: STUDENTS,
    };

    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
  }

  selectStudent = studentId => {
    const { students } = this.state;

    this.setState({ currentStudent: students.find(student => student.id === studentId) });
  };

  removeStudentById = studentId => {
    const { students } = this.state;

    this.setState({ students: [...students].filter(student => student.id !== studentId), currentStudent: null });
  };

  addStudent = student => {
    const { students } = this.state;

    this.setState({
      students: [...students].concat({ ...student, id: [...students].sort((a, b) => b.id - a.id)[0].id + 1 }),
    });
  };

  editStudent = editedStudent => {
    const { students } = this.state;

    this.setState({
      students: [...students].map(student => {
        if (student.id === editedStudent.id) {
          return editedStudent;
        } else {
          return student;
        }
      }),
      currentStudent: editedStudent,
    });
  };

  render() {
    const { currentStudent, students } = this.state;
    const { events, deleteEventStudent, addEvent, editEvent } = this.props;

    const currentStudentEvents = currentStudent && events.filter(event => event.student.id === currentStudent.id);

    return (
      <div className='panel'>
        <div className='editable-list'>
          <EditPanel
            addStudent={this.addStudent}
            removeStudentById={this.removeStudentById}
            editStudent={this.editStudent}
            currentStudent={currentStudent}
          />
          {students.length ? (
            <StudentsList students={students} currentStudent={currentStudent} selectStudent={this.selectStudent} />
          ) : (
            ''
          )}
        </div>
        {currentStudent && (
          <StudentInfo
            currentStudent={currentStudent}
            currentStudentEvents={currentStudentEvents}
            deleteEventStudent={deleteEventStudent}
            addEvent={addEvent}
            editEvent={editEvent}
          />
        )}
      </div>
    );
  }
}
