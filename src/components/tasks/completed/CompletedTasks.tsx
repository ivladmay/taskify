import { FC } from 'react';

import useTaskStore from '../../../stores/taskStore';

interface CompletedTasksProps {
  completeTask: (id: string) => void;
  activateTask: (id: string) => void;
}

const CompletedTasks: FC<CompletedTasksProps> = ({
  completeTask,
  activateTask,
}) => {
  const tasks = useTaskStore((state) => state.tasks);

  return tasks.some((task) => task.status === 'completed') ? (
    tasks.map(
      (task) =>
        task.status === 'completed' && (
          <div className='taskList__task' key={task.id}>
            <input
              id={task.id}
              className='checkbox'
              type='checkbox'
              checked
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
    <div className='empty'>No completed tasks</div>
  );
};

export default CompletedTasks;
