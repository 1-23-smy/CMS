import React from 'react'
// import FileUpload from './components/FileUpload.jsx'
// import Form from './components/Form.jsx'
import LoginSignup from './components/LoginSignup.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Card from './components/Card.jsx';
// import Home from './components/Allproperty.jsx';
import HomePage from './components/HomePage.jsx';
import UpdateProperty from './components/UpdateProperty.jsx';

const App = () => {
  return (
    // <FileUpload/>
    // <Form/>
    
      <Router>
        <Routes>
          <Route path='/' element={<LoginSignup />} />
          <Route path='/user' element={<HomePage />} />
          <Route path='/updateproperty' element={<UpdateProperty />} />
          
        </Routes>
      </Router>
    
   
  )
}

export default App