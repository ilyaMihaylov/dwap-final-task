import React, { Component } from 'react';
import { Button, Form, Select, Input, DatePicker } from 'antd';
import { STUDENTS } from '../../../Data';
import moment from 'moment';

const { Option } = Select;

class EventForm extends Component {
  resetForm = () => {
    const {
      form: { resetFields },
    } = this.props;

    resetFields();
  };

  addEvent = e => {
    const {
      addEvent,
      currentCompany,
      hideForm,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { date, student, text } = values;

        addEvent({
          date: date.format('YYYY-MM-DD'),
          text,
          company: { ...currentCompany },
          student: { id: STUDENTS.find(baseStudent => baseStudent.name === student).id, name: student },
        });

        this.resetForm();
        hideForm();
      }
    });
  };

  editEvent = e => {
    const {
      selectedEvent,
      editEvent,
      currentCompany,
      hideForm,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { date, student, text } = values;

        editEvent({
          id: selectedEvent.id,
          date: date.format('YYYY-MM-DD'),
          text,
          company: { ...currentCompany },
          student: { id: STUDENTS.find(baseStudent => baseStudent.name === student).id, name: student },
        });

        this.resetForm();
        hideForm();
      }
    });
  };

  render() {
    const {
      isHidden,
      hideForm,
      selectedEvent,
      resetSelection,
      form: { getFieldDecorator },
    } = this.props;
    const studentsOptions = STUDENTS.map(student => (
      <Option key={student.id} value={student.name}>
        {student.name}
      </Option>
    ));

    return (
      <div className={isHidden ? 'form' : 'form show'}>
        <Form
          layout='vertical'
          onSubmit={e => {
            if (selectedEvent) {
              this.editEvent(e);
            } else {
              this.addEvent(e);
            }
          }}
        >
          <Form.Item label='Date'>
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'Please choose date!',
                },
              ],
              initialValue: selectedEvent ? moment(selectedEvent.date, 'YYYY-MM-DD') : null,
            })(<DatePicker placeholder='Choose Date' />)}
          </Form.Item>
          <Form.Item label='Student'>
            {getFieldDecorator('student', {
              rules: [
                {
                  required: true,
                  message: 'Please select student!',
                },
              ],
              initialValue: selectedEvent ? selectedEvent.student.name : [],
            })(<Select placeholder='Select Student'>{studentsOptions}</Select>)}
          </Form.Item>
          <Form.Item label='Description'>
            {getFieldDecorator('text', {
              rules: [
                {
                  required: true,
                  message: 'Please enter description!',
                },
              ],
              initialValue: selectedEvent ? selectedEvent.text : '',
            })(<Input placeholder='Enter Description' />)}
          </Form.Item>
          <Form.Item className='form-actions'>
            <Button
              type='danger'
              htmlType='button'
              onClick={() => {
                hideForm();
                this.resetForm();
                resetSelection();
              }}
            >
              Cancel
            </Button>
            <Button type='primary' htmlType='submit'>
              {selectedEvent ? 'Confirm' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'eventForm' })(EventForm);
