import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest : sendTaskRequest} = useHttp();
  
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url : 'https://react-movie-http-95492-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method : 'POST',
      header : {
        'Content-Type': 'application/json',
      },
      body : { text: taskText }
      // bind - preconfigure 1st arg of createTask to be taskText
      // taskData will be appended after taskText when called
    }, createTask.bind(null, taskText));
  };

  return (
    <Section> 
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
