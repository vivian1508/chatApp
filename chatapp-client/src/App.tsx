
import './App.css'

import ChatWrapper from './components/ChatWrapper'
import Header from './components/Header'

function App() {
  //Todo: add login component and move login information into Context 
  const loginUserId = "66247e72dbfa6e281e8bb475";
  const userAvatar = "https://ui-avatars.com/api/?name=Vivian+Li&rounded=true&size=50&background=random";

  return (
    <div className="app">
      <Header title="Chat App" avatarUrl={userAvatar} />
      <ChatWrapper loginUserId={loginUserId} />
    </div>
  )
}

export default App
