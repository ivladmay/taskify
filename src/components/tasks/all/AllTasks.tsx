import { FC } from 'react';

import useTaskStore from '../../../stores/taskStore';

interface AllTasksProps {
  completeTask: (id: string) => void;
  activateTask: (id: string) => void;
}

const AllTasks: FC<AllTasksProps> = ({ completeTask, activateTask }) => {
  const tasks = useTaskStore((state) => state.tasks);

  return tasks.length > 0 ? (
    tasks.map((task) => (
      <div className='taskList__task' key={task.id}>
        <input
          id={task.id}
          className='checkbox'
          type='checkbox'
          checked={task.status === 'completed'}
          onChange={() =>
            task.status === 'active'
              ? completeTask(task.id)
              : activateTask(task.id)
          }
        />
        <label htmlFor={task.id} />
        <span className='text'>{task.title}</span>
      </div>
    ))
  ) : (
    <div className='empty'>No tasks</div>
  );
};

export default AllTasks;
