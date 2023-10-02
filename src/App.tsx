import { FC } from 'react';

import Input from './components/input/Input';
import TaskList from './components/tasks/TaskList';
import useTaskStore from './stores/taskStore';

const App: FC = () => {
  const createTask = useTaskStore((state) => state.createTask);

  return (
    <div className='app'>
      <div className='container'>
        <h1 className='container__title'>Taskify</h1>
        <Input buttonText='Add new task' onAdd={createTask} />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
