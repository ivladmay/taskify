import { FC, ReactElement, useState } from 'react';

import useTaskStore from '../../stores/taskStore';
import AllTasks from './all/AllTasks';
import ActiveTasks from './active/ActiveTasks';
import CompletedTasks from './completed/CompletedTasks';

const TaskList: FC = () => {
  const [tasks, completeTask, activateTask, clearCompletedTask] = useTaskStore(
    (state) => [
      state.tasks,
      state.completeTask,
      state.activateTask,
      state.clearCompletedTask,
    ],
  );

  const count = tasks.filter((task) => task.status === 'active').length;

  const [tab, setTab] = useState(
    <AllTasks completeTask={completeTask} activateTask={activateTask} />,
  );
  const [activeTab, setActiveTab] = useState('All');

  const handleButtonClick = (component: ReactElement, type: string) => {
    setTab(component);
    setActiveTab(type);
  };

  return (
    <div className='taskList'>
      <h2 className='taskList__title'>What needs to be done</h2>
      <div>{tab}</div>
      <div className='taskList__menu'>
        <span className='taskList__counter'>{count} items left</span>
        <div className='taskList__nav'>
          <button
            className={
              activeTab === 'All'
                ? 'taskList__button-active'
                : 'taskList__button'
            }
            type='button'
            onClick={() =>
              handleButtonClick(
                <AllTasks
                  completeTask={completeTask}
                  activateTask={activateTask}
                />,
                'All',
              )
            }
          >
            All
          </button>
          <button
            className={
              activeTab === 'Active'
                ? 'taskList__button-active'
                : 'taskList__button'
            }
            type='button'
            onClick={() =>
              handleButtonClick(
                <ActiveTasks
                  completeTask={completeTask}
                  activateTask={activateTask}
                />,
                'Active',
              )
            }
          >
            Active
          </button>
          <button
            className={
              activeTab === 'Completed'
                ? 'taskList__button-active'
                : 'taskList__button'
            }
            type='button'
            onClick={() =>
              handleButtonClick(
                <CompletedTasks
                  completeTask={completeTask}
                  activateTask={activateTask}
                />,
                'Completed',
              )
            }
          >
            Completed
          </button>
        </div>
        <button
          className='taskList__cleaner'
          type='button'
          onClick={() => clearCompletedTask()}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default TaskList;
