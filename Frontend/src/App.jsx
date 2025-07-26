import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom';
import Home from './Pages/Student/Home';
import CoursesList from './Pages/Student/CoursesList';
import CourseDetails from './Pages/Student/CourseDetails';
import MyEnrollments from './Pages/Student/MyEnrollments';
import Player from './Pages/Student/Player';
import Loading from './Components/Student/Loading';
import Educator from './Pages/Educator/Educator';
import DashBoard from './Pages/Educator/DashBoard';
import AddCourse from './Pages/Educator/AddCourse';
import MyCourses from './Pages/Educator/MyCourses';
import StudentsEnrolled from './Pages/Educator/StudentsEnrolled';
import Navbar from './Components/Student/Navbar';
import Footer from './Components/Student/Footer';
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');


  return (
    <div className="text-white min-h-screen bg-gray-950">
      <ToastContainer/>

    {!isEducatorRoute && <Navbar />}

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses-list" element={<CoursesList />}/>
      <Route path="/courses-list/:input" element={<CoursesList />}/>
      <Route path="/course/:id" element={<CourseDetails />}/>
      <Route path="/courses-list/course/:id" element={<CourseDetails />}/>
      <Route path="/my-enrollments" element={<MyEnrollments/>}/>
      <Route path="/player/:courseId" element={<Player/>}/>
      <Route path="/loading/:path" element={<Loading/>}/>
      
      {/* Educator Routes */}
      <Route path="/educator" element={<Educator/>}>
            <Route index element={<DashBoard/>}/>
            <Route path="add-course" element={<AddCourse/>}/>
            <Route path="my-courses" element={<MyCourses/>}/>
            <Route path="students-enrolled" element={<StudentsEnrolled/>}/>

      </Route>

     </Routes>

     {!isEducatorRoute && <Footer/>}
      
    </div>
  )
}

export default App