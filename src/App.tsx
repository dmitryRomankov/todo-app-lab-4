import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { NotificationManager } from './components/notification/Notification';

import './styles/main.css';

const App = () => {
  return (
    <div className="container">
      <Filter />
      <TodoList />
      <NotificationManager />
    </div>
  );
};

export default App;
