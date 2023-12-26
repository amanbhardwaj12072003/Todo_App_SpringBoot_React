import { useEffect, useState } from "react";
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoApi,
} from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  const authContext = useAuth();
  const username = authContext.username;

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
  }

  useEffect(() => {
    refreshTodos();
  }, []);

  const [message, setMessage] = useState(null);
  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then(() => {
        setMessage(`Todo with ID ${id} has been deleted`);
        refreshTodos();
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
  }

  function updateTodo(id) {
    console.log("clicked id " + id);
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate("/todo/-1");
  }

  return (
    <div className="container">
      <h1>Your Pending Todos</h1>
      {message && (
        <div className="alert alert-warning alert-dismissible fade show">
          {message}
        </div>
      )}
      <div>
        <table className="table table-light">
          <thead className="thead-dark">
            <tr>
              {/* <th>Id</th> */}
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Wanna Delete?</th>
              <th>Wanna Update?</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                {/* <td>{todo.id}</td> */}
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}
export default ListTodosComponent;

/*
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    {
      id: 1,
      description: "Learn React.JS",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 2,
      description: "Learn Node.JS",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Learn Express.JS",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 4,
      description: "Learn MongoDB",
      done: false,
      targetDate: targetDate,
    },
  ]; */
