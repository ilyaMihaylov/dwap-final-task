import React, { Component } from 'react';
import { Button, Form, Select, Input, DatePicker } from 'antd';
import { COMPANIES } from '../../../Data';
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
      currentStudent,
      hideForm,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { date, company, text } = values;

        addEvent({
          date: date.format('YYYY-MM-DD'),
          text,
          company: { id: COMPANIES.find(baseCompany => baseCompany.name === company).id, name: company },
          student: { ...currentStudent },
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
      currentStudent,
      hideForm,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { date, company, text } = values;

        editEvent({
          id: selectedEvent.id,
          date: date.format('YYYY-MM-DD'),
          text,
          company: { id: COMPANIES.find(baseCompany => baseCompany.name === company).id, name: company },
          student: { ...currentStudent },
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
      resetSelection,
      form: { getFieldDecorator },
      selectedEvent,
    } = this.props;
    const companiesOptions = COMPANIES.map(company => (
      <Option key={company.id} value={company.name}>
        {company.name}
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
          <Form.Item label='Company'>
            {getFieldDecorator('company', {
              rules: [
                {
                  required: true,
                  message: 'Please select company!',
                },
              ],
              initialValue: selectedEvent ? selectedEvent.company.name : [],
            })(<Select placeholder='Select Company'>{companiesOptions}</Select>)}
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
