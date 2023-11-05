import React, { useEffect, useState } from 'react';
import { List, Spin, Button, Select, Card } from 'antd';
import Pagination from '../common/Pagination';
import DeleteModal from '../common/DeleteModal';
import TasksForm from './TasksForm';
import './taskList.css';
import { getTasks, getTask, deleteTask } from '../../services/tasks';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const TaskList = ({ renderMessage }) => {

  const pageSize = 5;

  const [state, setState] = useState({
    isDeleteModalVisible: false,
    deleteId: null,
    initialData: null,
    viewOnly: false,
    isFormModalVisible: false,
    tasks: [],
    count: 0,
    loading: false,
    pageNumber: 1,
    filters: { completed: 'both' },
    editId: null,
    status: 'both',
    message: '',
    messageType: 'success',
    visibleAlert: false
  })

  const { Option } = Select

  const fetchTasks = (pageNumber, pageSize, filter) => {

    setState(prev => {
      return { ...prev, loading: true }
    })

    getTasks(pageNumber, pageSize, filter).then(res => {

      setState(prev => {

        return { ...prev, message: 'oye', visibleAlert: true, pageNumber, loading: false, count: res?.data?.data?.count || 0, tasks: res?.data?.data?.tasks || [] }

      })

    }).catch(err => {
      console.log(err, 'Error while fetching data')
      renderMessage('Error while fetching tasks!', 'error')
      setState({ ...state, loading: false })
    })

  }

  const fetchSingleTask = (taskId, viewOnly = false) => {

    getTask(taskId).then(res => {

      setState(prev => {
        return { ...prev, initialData: res?.data?.data || null, isFormModalVisible: true, viewOnly, editId: viewOnly ? null : taskId }
      })

    }).catch(err => {
      console.log(err, 'Error while fetching data')
      renderMessage('Error while fetching task!', 'error')
      setState({ ...state, initialData: null, isFormModalVisible: false, viewOnly, editId: viewOnly ? null : taskId })
    })
  }

  useEffect(() => {
    fetchTasks(1, pageSize, state.filters)

  }, [])


  if (state.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleDelete = (deleteId) => {
    setState({ ...state, isDeleteModalVisible: true, deleteId })
  };

  const handleConfirmDelete = () => {

    deleteTask(state.deleteId).then(res => {

      renderMessage('Task Deleted!', 'success')

      setState(prev => {
        return { ...prev, isDeleteModalVisible: false, deleteId: null }
      })

      fetchTasks(state.pageNumber, pageSize, state.filters)

    }).catch(err => {

      renderMessage('Error while deleting task!', 'error')

      setState(prev => {
        return { ...prev, iisDeleteModalVisible: false, deleteId: null }
      })
    })

  };

  const handleCancelDelete = () => {
    setState({ ...state, isDeleteModalVisible: false, deleteId: null })

  };

  const handleCreateTask = (shouldCallApi = false) => {

    if (shouldCallApi) {
      fetchTasks(state.pageNumber, pageSize, state.filters)
    }

    setState(prev => {
      return { ...prev, isFormModalVisible: !prev.isFormModalVisible, initialData: null, editId: false }
    })
  };

  const handlePageChange = (e) => {
    console.log(e)
    fetchTasks(e, pageSize, state.filters)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: "end", alignItems: 'center', marginBottom: '20px' }}>
        <Button onClick={() => setState(prev => {
          return { ...prev, isFormModalVisible: !prev.isFormModalVisible, initialData: null, viewOnly: false }
        })} type="primary" style={{ margin: '10px' }}>
          Create Task
        </Button>
        <Select
          disabled={state.loading}
          value={state.status}
          placeholder="Select Status"
          onChange={(e) => {
            setState(prev => {
              return { ...prev, status: e, filters: { completed: e } }
            })
            fetchTasks(state.pageNumber, pageSize, { completed: e })
          }}
        >
          <Option value={'both'}>Both</Option>
          <Option value={true}>Complete</Option>
          <Option value={false}>Incomplete</Option>
        </Select>
      </div>

      {(Array.isArray(state.tasks) && state.tasks.length > 0) && state.tasks.map(item => {
        return (
          <Card
            key={item._id}
            style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px', width: '95%', margin: "40px auto 40px auto", height: "200px", padding: "20px" }}
            title={item.title}
            extra={
              <div className={'actions-btn'}>
                <Button icon={<EyeOutlined />} key="view" onClick={() => fetchSingleTask(item?._id, true)}>View</Button>
                <Button icon={<EditOutlined />} key="edit" onClick={() => fetchSingleTask(item?._id)}>Edit</Button>
                <Button icon={<DeleteOutlined />} key="delete" onClick={() => handleDelete(item?._id)}>Delete</Button>
              </div>
            }
          >
            <p>{item?.description?.length > 400
              ? item.description.slice(0, 400) + '...'
              : item.description}</p>

            <p><b>Status: </b>{item?.completed ? 'Completed' : 'Not Completed'}</p>
          </Card>
        )
      })}

      <Pagination
        totalItems={state.count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        current={state.pageNumber}
      />

      <TasksForm
        editId={state.editId}
        viewOnly={state.viewOnly}
        handleCreateTask={handleCreateTask}
        initialData={state.initialData}
        isFormModalVisible={state.isFormModalVisible}
        renderMessage={renderMessage}
      />

      <DeleteModal
        visible={state.isDeleteModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Confirm"
        message="Are you sure you want to delete this task?"
      />

    </>
  );
};

export default TaskList;
