import { FC } from 'react';

import useTaskStore from '../../../stores/taskStore';

interface ActiveTasksProps {
  completeTask: (id: string) => void;
  activateTask: (id: string) => void;
}

const ActiveTasks: FC<ActiveTasksProps> = ({ completeTask, activateTask }) => {
  const tasks = useTaskStore((state) => state.tasks);

  return tasks.some((task) => task.status === 'active') ? (
    tasks.map(
      (task) =>
        task.status === 'active' && (
          <div className='taskList__task' key={task.id}>
            <input
              id={task.id}
              className='checkbox'
              type='checkbox'
              onChange={() =>
                task.status === 'active'
                  ? completeTask(task.id)
                  : activateTask(task.id)
              }
            />
            <label htmlFor={task.id} />
            <span className='text'>{task.title}</span>
          </div>
        ),
    )
  ) : (
    <div className='empty'>No active tasks</div>
  );
};

export default ActiveTasks;
