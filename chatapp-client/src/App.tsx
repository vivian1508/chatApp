
import './App.css'

import ChatWrapper from './components/ChatWrapper'
import Header from './components/Header'

function App() {
    //Todo: add login component and pass loginUserId as props or put it in Context 
  const loginUserId = "66247e72dbfa6e281e8bb475";
  const userAvatar = "https://ui-avatars.com/api/?name=Vivian+Li&rounded=true&size=50&background=random";

  return (
    <div className="app">
      <Header title="Chat App" avatarUrl={userAvatar}/>
      <ChatWrapper loginUserId={loginUserId}/>
    </div>
  )




  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
