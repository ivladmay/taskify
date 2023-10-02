import { FC, useState } from 'react';

interface InputProps {
  buttonText: string;
  onAdd: (title: string) => void;
}

const TaskInput: FC<InputProps> = ({ onAdd, buttonText }) => {
  const [value, setValue] = useState('');

  return (
    <div className='container__form'>
      <input
        className='container__input'
        type='text'
        placeholder='Task title'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAdd(value);
            setValue('');
          }
        }}
      />
      <button
        className='container__button'
        type='submit'
        onClick={() => {
          onAdd(value);
          setValue('');
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TaskInput;
