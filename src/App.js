import React, { useContext } from 'react';
import { ModeConext as ThemeContext } from './context/index';
import { Button } from 'antd';
import './App.css';
import TaskList from './components/tasks/TaskList'
import { showMessage } from './utils/index';
import { message } from 'antd';

function App() {

  const { isDarkMode, toggleMode } = useContext(ThemeContext);

  const [messageApi, contextHolder] = message.useMessage();

  const renderMessage = (userMessage, type) => {
    showMessage(messageApi, userMessage, type)
  }

  return (
    <div className={isDarkMode ? 'App dark' : 'App'}>
      {contextHolder}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end' }}>
        <Button onClick={toggleMode}>
          {isDarkMode ? 'Switch to Bright Theme' : 'Switch to Dark Theme'}
        </Button>
        <h1 style={{ alignSelf: 'center' }}>Task Management Application</h1>
      </div>


      <TaskList renderMessage={renderMessage} />
    </div>
  );
}

export default App;
