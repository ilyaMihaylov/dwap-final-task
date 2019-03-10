import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class EditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isEdit: false,
    };
  }

  editCompany = e => {
    const {
      editCompany,
      currentCompany,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { name, spec, year, group } = values;

        editCompany({ ...currentCompany, name, spec, year, group });

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
    this.resetForm();
    this.setState({ isHidden: true });
  };

  addCompany = e => {
    const {
      addCompany,
      form: { validateFields },
    } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { name, spec, year, group } = values;

        addCompany({ name, spec, year, group });

        this.closeForm();
      }
    });
  };

  render() {
    const { isHidden, isEdit } = this.state;
    const {
      form: { getFieldDecorator },
      currentCompany,
      removeCompanyById,
    } = this.props;

    return (
      <div className='edit-form'>
        <div className='button-panel'>
          <Button
            type='primary'
            shape='circle'
            icon='plus-circle'
            size='large'
            onClick={() => {
              this.resetEditing();
              this.openForm();
            }}
          />
          <Button
            type='primary'
            shape='circle'
            icon='delete'
            size='large'
            disabled={!currentCompany}
            onClick={() => {
              this.resetEditing();
              this.closeForm();
              removeCompanyById(currentCompany.id);
            }}
          />
          <Button
            type='primary'
            shape='circle'
            icon='edit'
            size='large'
            disabled={!currentCompany}
            onClick={() => {
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
                this.editCompany(e);
              } else {
                this.addCompany(e);
              }
            }}
          >
            <Form.Item label='Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input company name!',
                  },
                ],
                initialValue: isEdit ? currentCompany.name : '',
              })(<Input placeholder='Enter Name' />)}
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

export default Form.create({ name: 'companyForm' })(EditPanel);
