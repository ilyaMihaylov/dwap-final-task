import React, { Component } from 'react';
import StudentsList from './StudentsList';
import StudentInfo from './StudentInfo';
import EditPanel from './EditPanel';

export default class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: null,
      students: [
        { id: 1, name: 'Петров П.П.', spec: 'ИСиТ', group: 1, year: 2016 },
        { id: 2, name: 'Иванов И.И.', spec: 'ИСиТ', group: 1, year: 2016 },
        { id: 3, name: 'Сидоров С.С.', spec: 'ПОИТ', group: 4, year: 2016 },
        { id: 4, name: 'Кириллов К.К.', spec: 'ПОИТ', group: 5, year: 2016 },
        { id: 5, name: 'Алексеев А.А.', spec: 'ДЭВИ', group: 9, year: 2016 },
        { id: 6, name: 'Сергеев С.С.', spec: 'ПОИБМС', group: 7, year: 2017 },
        { id: 7, name: 'Михайлов М.М.', spec: 'ПОИБМС', group: 8, year: 2017 },
        { id: 8, name: 'Александров А.А.', spec: 'ПОИБМС', group: 7, year: 2017 },
        { id: 9, name: 'Кислый К.А.', spec: 'ДЭВИ', group: 10, year: 2017 },
        { id: 10, name: 'Прокопеня А.А.', spec: 'ПОИБМС', group: 7, year: 2017 },
        { id: 11, name: 'Ветров А.В.', spec: 'ПОИБМС', group: 8, year: 2017 },
        { id: 12, name: 'Викторов В.В.', spec: 'ИСиТ', group: 3, year: 2017 },
        { id: 13, name: 'Алексей А.А.', spec: 'ПОИБМС', group: 7, year: 2015 },
        { id: 14, name: 'Григорьев  Г.Г.', spec: 'ДЭВИ', group: 9, year: 2016 },
        { id: 15, name: 'Владимиров В.В.', spec: 'ПОИБМС', group: 8, year: 2017 },
        { id: 16, name: 'Петров П.П.', spec: 'ДЭВИ', group: 9, year: 2017 },
        { id: 17, name: 'Юрьев Ю.Ю.', spec: 'ИСиТ', group: 3, year: 2017 },
        { id: 18, name: 'Евгеньев Е.В.', spec: 'ПОИБМС', group: 6, year: 2018 },
        { id: 19, name: 'Валерьев В.В.', spec: 'ПОИБМС', group: 7, year: 2017 },
        { id: 20, name: 'Антонов А.А.', spec: 'ПОИБМС', group: 7, year: 2017 },
        { id: 21, name: 'Афанасьев А.А.', spec: 'ИСиТ', group: 2, year: 2015 },
        { id: 22, name: 'Федоров Ф.Ф.', spec: 'ПОИБМС', group: 7, year: 2016 },
        { id: 23, name: 'Николаев Н.Н.', spec: 'ИСиТ', group: 3, year: 2017 },
      ],
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
    const { events } = this.props;

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
        {currentStudent && <StudentInfo currentStudent={currentStudent} currentStudentEvents={currentStudentEvents} />}
      </div>
    );
  }
}
