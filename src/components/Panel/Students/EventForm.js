import React, { Component } from 'react';
import { Button, Form, Select, Input, DatePicker } from 'antd';
import { COMPANIES } from '../../../Data';

const { Option } = Select;

class EventForm extends Component {
  resetForm = () => {
    const {
      form: { resetFields },
    } = this.props;

    resetFields();
  };

  render() {
    const {
      isHidden,
      hideForm,
      form: { getFieldDecorator },
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
            this.addStudent(e);
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
            })(<Input placeholder='Enter Description' />)}
          </Form.Item>
          <Form.Item className='form-actions'>
            <Button
              type='danger'
              htmlType='button'
              onClick={() => {
                hideForm();
                this.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => {
                hideForm();
              }}
            >
              {'Add'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'eventForm' })(EventForm);
