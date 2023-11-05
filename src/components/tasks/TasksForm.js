import React, { useEffect } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import { addTask, updateTask } from '../../services/tasks'


const TasksForm = ({
    editId,
    viewOnly = false,
    handleCreateTask,
    initialData,
    isFormModalVisible,
    renderMessage
}) => {

    const [form] = Form.useForm();

    const { Option } = Select;

    useEffect(() => {
        console.log('hello paa g', initialData)
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.setFieldsValue({
                title: "",
                description: "",
                completed: false
            });
        }
    }, [form, initialData]);

    const handleCancel = (shouldCallApi = false) => {
        form.setFieldsValue({
            title: "",
            description: "",
            completed: false
        });
        handleCreateTask(shouldCallApi)
    }

    const onFinish = (values) => {

        if (editId) {

            updateTask(values, editId).then((response) => {

                renderMessage('Task Updated Successfully!', 'success')

                handleCancel(true)


            })
                .catch((error) => {

                    console.error('Error creating task:', error)

                    renderMessage('Error while creating task', 'success')

                    return false

                });

        } else {

            addTask(values).then((response) => {
                renderMessage('Task Created Successfully!', 'success')
                handleCancel(true)
            })
                .catch((error) => {
                    console.log(error)
                    renderMessage('Error while creating task', 'error')
                    return false
                });
        }
    }

    return (
        <>
            <Modal
                forceRender
                title="Create Task"
                open={isFormModalVisible}
                onCancel={() => handleCancel()}
                footer={
                    viewOnly
                        ? null
                        : [
                            <Button key="cancel" onClick={() => handleCancel()}>
                                Cancel
                            </Button>,
                            <Button form="taskForm" onClick={form.submit} key="submit" htmlType="submit" type="primary">
                                {editId ? 'Update' : 'Add'}
                            </Button>
                        ]
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialData}
                    onFinish={onFinish}
                >
                    <Form.Item label="Title (150 characters)" name="title" rules={[{ required: true }]}>
                        <Input disabled={viewOnly} />
                    </Form.Item>
                    <Form.Item name="completed" label="Status" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a status of task"
                            disabled={viewOnly}
                        >
                            <Option value={true}>Complete</Option>
                            <Option value={false}>Incomplete</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea disabled={viewOnly} />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
};

export default TasksForm;