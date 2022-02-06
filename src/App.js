import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import { useState, useEffect } from 'react';
import Todo from './views/Todo';
import Covid from './views/Covid';
import Blog from './views/Blog';
import DetailBlog from './views/DetailBlog';
import AddNewBlog from './views/AddNewBlog';
import NotFound from './views/NotFound';
import YoutubeSearch from './views/YoutubeSearch';
import { CountDown, NewCountDown } from './views/CountDown';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  let [name, setName] = useState('Huan');
  const [address, setAddress] = useState('');
  const [todos, setTodos] = useState([
    { id: 'todo1', title: 'Watching Youtube', type: 'Huan' },
    { id: 'todo2', title: 'Doing homework', type: 'Huan' },
    { id: 'todo3', title: 'Playing game', type: 'Huan 2' },
    { id: 'todo4', title: 'Reading book', type: 'Huan 2' },
  ]);

  useEffect(() => {
    console.log('run useEffect');
  }, [address]);

  useEffect(() => {
    console.log('run useEffect todos');
  }, [todos]);

  const handleOnClick = () => {
    if (!address) {
      alert('empty input');
      return;
    }
    let newTodo = { id: Math.floor(Math.random() * 100), title: address, type: 'Huan' };
    setTodos([...todos, newTodo])
    setAddress('')
  }

  const handleOnChangeInput = (event) => {
    setAddress(event.target.value)
  }

  const deleteDataTodo = (id) => {
    let currentTodos = todos;
    currentTodos = currentTodos.filter(todo => todo.id !== id)
    setTodos(currentTodos);
  }

  const onTimesup = () => {
    alert('Times up')
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route path="/" exact>
              <Covid />
            </Route>
            <Route path="/timer">
              <CountDown
                onTimesup={onTimesup}
              />
              <span>-----------------------</span>
              <NewCountDown
                onTimesup={onTimesup}
              />
            </Route>
            <Route path="/todo">
              <Todo
                todos={todos}
                title={'List Todos'}
                deleteDataTodo={deleteDataTodo}
              />

              <input type="text" value={address} onChange={(event => handleOnChangeInput(event))} />

              <button type="button" onClick={() => handleOnClick()}>Click me</button>
            </Route>
            <Route path="/blog" exact>
              <Blog />
            </Route>
            <Route path="/blog/:id">
              <DetailBlog />
            </Route>
            <Route path="/add-new-blog">
              <AddNewBlog />
            </Route>
            <Route path="/secret">
              <YoutubeSearch />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </header>

      </div>
    </Router>
  );
}

export default App;
