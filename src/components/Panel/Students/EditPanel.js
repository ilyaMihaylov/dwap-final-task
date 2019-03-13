import React, { Component } from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';

const { Option } = Select;

class EditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isEdit: false,
    };
  }

  editStudent = e => {
    const {
      editStudent,
      currentStudent,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { name, spec, year, group } = values;

        editStudent({ ...currentStudent, name, spec, year, group });

        this.closeForm();
      }
    });
  };

  resetEditing = () => {
    this.setState({ isEdit: false });
  };

  resetForm = () => {
    const {
      form: { resetFields },
    } = this.props;

    resetFields();
  };

  openForm = () => {
    this.setState({ isHidden: false });
  };

  closeForm = () => {
    this.setState({ isHidden: true, isClosing: true });
    this.resetForm();
  };

  addStudent = e => {
    const {
      addStudent,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { name, spec, year, group } = values;

        addStudent({ name, spec, year, group });

        this.closeForm();
      }
    });
  };

  render() {
    const { isHidden, isEdit } = this.state;
    const {
      form: { getFieldDecorator },
      currentStudent,
      removeStudentById,
    } = this.props;
    const currentYear = new Date().getFullYear();

    return (
      <div className='edit-form'>
        <div className='button-panel'>
          <Button
            type='primary'
            shape='circle'
            icon='plus-circle'
            size='large'
            onClick={() => {
              this.resetForm();
              this.resetEditing();
              this.openForm();
            }}
          />
          <Button
            type='primary'
            shape='circle'
            icon='delete'
            size='large'
            disabled={!currentStudent}
            onClick={() => {
              if (isEdit) {
                this.resetEditing();
                this.closeForm();
              }
              removeStudentById(currentStudent.id);
            }}
          />
          <Button
            type='primary'
            shape='circle'
            icon='edit'
            size='large'
            disabled={!currentStudent}
            onClick={() => {
              this.resetForm();
              this.setState({ isEdit: true });
              this.openForm();
            }}
          />
        </div>
        <div className={isHidden ? 'form' : 'form show'}>
          <Form
            layout='vertical'
            onSubmit={e => {
              if (isEdit) {
                this.editStudent(e);
              } else {
                this.addStudent(e);
              }
            }}
          >
            <Form.Item label='Full Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input student name!',
                  },
                ],
                initialValue: isEdit ? currentStudent.name : '',
              })(<Input placeholder='Enter Full Name' />)}
            </Form.Item>
            <Form.Item label='Speciality'>
              {getFieldDecorator('spec', {
                rules: [
                  {
                    required: true,
                    message: 'Please select student speciality!',
                  },
                ],
                initialValue: isEdit ? currentStudent.spec : [],
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
                initialValue: isEdit ? currentStudent.year : '',
              })(<InputNumber min={currentYear - 10} max={currentYear} placeholder='Enter Year' />)}
            </Form.Item>
            <Form.Item label='Group'>
              {getFieldDecorator('group', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter student group!',
                  },
                ],
                initialValue: isEdit ? currentStudent.group : '',
              })(<InputNumber min={1} max={20} placeholder='Enter Group' />)}
            </Form.Item>
            <Form.Item className='form-actions'>
              <Button type='danger' htmlType='button' onClick={this.closeForm}>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                {isEdit ? 'Confirm' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'studentForm' })(EditPanel);
