import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  retrieveHelloWorld,
  retrieveHelloWorldBean,
  retrieveHelloWorldPathVariable,
} from "../api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const [helloWorldMessage, setHelloWorldMessage] = useState(null);

  const authContext = useAuth();

  function successfulResponse(response) {
    console.log(response);
  }

  function errorResponse(response) {
    console.log(response);
  }

  // Calling Hello World Rest API
  function callHelloWorldRestApi() {
    retrieveHelloWorld(authContext.token)
      .then((response) => {
        successfulResponse(response);
        setHelloWorldMessage(response.data);
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  // Calling Hello World Bean Rest Api
  const [helloWorldBeanMessage, setHelloWorldBeanMessage] = useState(null);
  function callHelloWorldBeanRestApi() {
    retrieveHelloWorldBean(authContext.token)
      .then((response) => {
        successfulResponse(response);
        setHelloWorldBeanMessage(response.data.message);
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  // Calling Hello World Path Variable Rest Api
  const [helloWorldPathVariableMessage, setHelloWorldPathVariableMessage] =
    useState(null);
  function callHelloWorldPathVariableRestApi() {
    retrieveHelloWorldPathVariable("Aman", authContext.token)
      .then((response) => {
        successfulResponse(response);
        setHelloWorldPathVariableMessage(response.data.message);
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  const { username } = useParams();
  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        {username}, Do you want to manage your todos -{" "}
        <Link to="/todos" username={username}>
          Go Here
        </Link>
      </div>
      <div>
        <button className="btn btn-success m-2" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{helloWorldMessage}</div>

      <div>
        <button
          className="btn btn-success m-2"
          onClick={callHelloWorldBeanRestApi}
        >
          Call Hello World Bean
        </button>
      </div>
      <div className="text-info">{helloWorldBeanMessage}</div>

      <div>
        <button
          className="btn btn-success m-2"
          onClick={callHelloWorldPathVariableRestApi}
        >
          Call Hello World Path Variable
        </button>
      </div>
      <div className="text-info">{helloWorldPathVariableMessage}</div>
    </div>
  );
}

export default WelcomeComponent;
