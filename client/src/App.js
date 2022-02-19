import React, { useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import './App.css'

import TopNavbar from './components/TopNavbar/TopNavbar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import CurrentlyReading from './components/CurrentlyReading/CurrentlyReading';
import Library from './components/Library/Library'
import Challenge from './components/Challenge/Challenge'
import Feed from './components/Feed/Feed'
import AddBookForm from './components/CurrentlyReading/AddBookForm/AddBookForm';
import EditBookForm from './components/CurrentlyReading/EditBookForm/EditBookForm';
import LibraryForm from './components/Library/LibraryForm/LibraryForm';
import Profile from './components/Profile/Profile';
import Auth from './Auth/Auth';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './actions/auth';

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)


    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user'))) {
            dispatch(getUserInfo())
        }
        if (user === null) {
            navigate('/auth')
        }
    }, [])
    
    return (
        <div id='App'>
            <Container className="main-container" xs={12}>
                <TopNavbar />
                <div style={{height: '60px'}}/>
                <Routes >
                    {/* Authentication */}
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/profile' element={<Profile />} />
                    
                    {/* Currently Reading */}
                    <Route path='/' element={<CurrentlyReading />} />
                    <Route path='/add-book' element={<AddBookForm />} />
                    <Route path='/edit-book' element={<EditBookForm />} />

                    {/* Library */}
                    <Route path='/library' exact element={<Library />} />
                    <Route path='/library-form' exact element={<LibraryForm />} />

                    {/* Challenge */}
                    <Route path='/challenge' element={<Challenge />} />

                    {/* News Feed */}
                    <Route path='/feed' element={<Feed />} />
                </Routes>
                <div style={{height: '100px'}}/>
                <BottomNavbar />
            </Container>
        </div>
    );
};

export default App;
