/* eslint-disable no-unused-vars */
import React from "react"
import Header from "./component/Header"
import Footer from "./component/Footer"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./component/Header";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Dashboard from "./component/Dashboard"
import Entry from "./pages/Entry"
import Chatbot from "./pages/Chatbot"
import Projections from "./pages/Projections"
import ExpenseHistory from "./pages/ExpenseHistory"
import CategoryWise from "./pages/CategoryWise"
import Payment from "./component/Payments"
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/entry" element={<Entry/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>
          <Route path="/projections" element={<Projections/>}/>
          <Route path="/expenseHistory" element={<ExpenseHistory/>}/>
          <Route path="/categoryWise" element={<CategoryWise/>}/>
          <Route path="/payment" element={<Payment/>}/>
          {/* Add more routes as needed */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
