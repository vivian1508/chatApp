
import './App.css'

import ChatWrapper from './components/ChatWrapper'
import Header from './components/Header'
import { LOGIN_USER_ID, USER_AVATAR } from './utils/constants';

function App() {
  return (
    <div className="app">
      <Header title="Chat App" avatarUrl={USER_AVATAR} />
      <ChatWrapper loginUserId={LOGIN_USER_ID} />
    </div>
  )
}

export default App;
