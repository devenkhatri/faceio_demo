import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [responseText, setResponseText] = useState("");

  let faceio;
  useEffect(() => {
    faceio = new faceIO("fioa6a1a");
  }, []);

  const handleSignIn = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async () => {
    try {
      setResponseText();
      let response = await faceio.authenticate({
        locale: "auto",
      });

      console.log("Unique Facial ID: ",response.facialId)
      console.log("PayLoad: ",response.payload);
      setResponseText(response.facialId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <section>
      <h1>Face Authentication by FaceIO</h1>
      <button onClick={handleSignIn}>Sign-in</button>
      <button onClick={handleLogIn}>Log-in</button>
      <div>Face Auth Response: ${responseText}</div>
    </section>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
