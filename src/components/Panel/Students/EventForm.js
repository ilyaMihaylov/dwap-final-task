import React, { Component } from 'react';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';

const { Option } = Select;

class EventForm extends Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className='form'>
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
          <Form.Item label='Speciality'>
            {getFieldDecorator('spec', {
              rules: [
                {
                  required: true,
                  message: 'Please select student speciality!',
                },
              ],
            })(
              <Select placeholder='Select Speciality'>
                <Option value='ИСиТ'>ИСиТ</Option>
                <Option value='ПОИТ'>ПОИТ</Option>
                <Option value='ДЭВИ'>ДЭВИ</Option>
                <Option value='ПОИБМС'>ПОИБМС</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='Admission Year'>
            {getFieldDecorator('year', {
              rules: [
                {
                  required: true,
                  message: 'Please enter student year of admission!',
                },
              ],
            })(<InputNumber placeholder='Enter Year' />)}
          </Form.Item>
          <Form.Item label='Description'>
            {getFieldDecorator('text', {
              rules: [
                {
                  required: true,
                  message: 'Please enter description!',
                },
              ],
            })(<Input placeholder='Enter Group' />)}
          </Form.Item>
          <Form.Item className='form-actions'>
            <Button type='danger' htmlType='button' onClick={this.closeForm}>
              Cancel
            </Button>
            <Button type='primary' htmlType='submit'>
              {'Add'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'eventForm' })(EventForm);
