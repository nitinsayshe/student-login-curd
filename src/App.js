
import './App.css';
import { Route, Routes ,BrowserRouter ,Navigate} from "react-router-dom";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home';
import AddStudent from './components/AddStudent/AddStudent';
import StudentList from './components/StudentList/StudentList';
import EditStudent from './components/EditStudent/EditStudent';

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
    
    <Routes>
    {user && <Route path="/" exact element={<Home />} />}
    <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/register" exact element={<SignUp />} />
      <Route path="/login" exact element={<SignIn />} />
      <Route path="/addStudent" exact element={<AddStudent />} />
      <Route path="/studentList" exact element={<StudentList/>} />
      <Route path='/editstudent/:id' element={<EditStudent/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
