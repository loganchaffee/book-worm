import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Routes, Route, useNavigate, Redirect, Navigate, useParams } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './index.css'

import TopNavbar from './components/TopNavbar/TopNavbar'
import BottomNavbar from './components/BottomNavbar/BottomNavbar'
import CurrentlyReading from './components/CurrentlyReading/CurrentlyReading'
import Library from './components/Library/Library'
import Challenge from './components/Challenge/Challenge'
import Feed from './components/Feed/Feed'
import AddBookForm from './components/CurrentlyReading/AddBookForm/AddBookForm'
import EditBookForm from './components/CurrentlyReading/EditBookForm/EditBookForm'
import LibraryForm from './components/Library/LibraryForm/LibraryForm'
import Profile from './components/Profile/Profile'
import Auth from './Auth/Auth'
import ReadingSpeedTest from './components/Challenge/ReadingSpeedTest/ReadingSpeedTest'
import ReadingSpeedTestCompletion from './components/Challenge/ReadingSpeedTest/ReadingSpeedTestResults/ReadingSpeedTestResults'
import ReadingDeadline from './components/Challenge/ReadingDeadline/ReadingDeadline'
import PublicProfile from './components/Profile/PublicProfile'
import ViewPost from './components/Feed/ViewPost/ViewPost'
import PointAnimation from './components/PointAnimation/PointAnimation'
import LandingPage from './components/LandingPage/LandingPage'

import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from './actions/auth'
import { getPosts } from './actions/posts'
import { getBooks } from './actions/books'
import { getNotifications } from './actions/notifications'
import currentPost from './reducers/currentPost'
import LargeTopNavbar from './components/LargeTopNavbar/LargeTopNavbar'
import Sidebar from './components/Sidebar/Sidebar'
import NotificationsModal from './components/NotificationsModal/NotificationsModal'
import RequestPasswordReset from './components/RequestPasswordReset/RequestPasswordReset'
import ResetPassword from './components/ResetPassword/ResetPassword'
import NewUserWelcomeModal from './components/NewUserWelcomeModal/NewUserWelcomeModal'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector((state) => state.auth)
    const posts = useSelector((state) => state.posts)
    const pointsJustScored = useSelector(state => state.pointsJustScored)
    const currentPost = useSelector((state) => state.currentPost)
    const currentVisitedUser = useSelector((state) => state.currentVisitedUser)
    // const books = useSelector((state) => state.books)

    // useEffect(() => {
    //     let arr = []
    //     for (let i = 0; i < books.length; i++) {
    //         const book = books[i];
    //         arr.push({ _id: book._id, thumbnail: book.thumbnail })
    //     }
    //     console.log(arr);
    // }, [books])


    // The user data is stored in the redux store, but the boolean of isLoggedIn is stored here
    // In the main app component so that we can conditionally render the authentication form or the home page.
    const [isLoading, setIsLoading] = useState(true)

    // Check for token in local storage and request user details
    useEffect(() => {
        if (!user) {
            if (localStorage.getItem('user')) {
                dispatch(getUserInfo(navigate, setIsLoading))
            } else {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
        }
    }, [user?._id])

    useEffect(() => {
        // dispatch(getPosts(0))
        dispatch(getBooks())
        dispatch(getNotifications())
    }, [])

    if (isLoading) return null
    if (user) {
        return (
            <div id='App' key={user._id + "App"}>
                <Sidebar />
                <TopNavbar />
                <div className="main-container" xs={12}>
                    <div className='main-content'>
                        <Routes>
                            {/* Authentication */}
                            <Route path='/profile' element={<Profile />}/>
                            
                            {/* Currently Reading */}
                            <Route path='/' element={<CurrentlyReading />}/>
                            <Route path='/add-book' element={<AddBookForm />}/>
                            <Route path='/edit-book/:id' element={<EditBookForm />}/>
        
                            {/* Library */}
                            <Route path='/library' exact element={<Library />}/>
                            <Route path='/library-form/:id' exact element={<LibraryForm />}/>
        
                            {/* Challenge */}
                            <Route path='/challenge' element={<Challenge />}/>
                            <Route path='/reading-speed-test' element={<ReadingSpeedTest />}/>
                            <Route path='/reading-speed-test/results' element={<ReadingSpeedTestCompletion />}/>
                            <Route path='/challenge/reading-deadline' element={<ReadingDeadline />}/>
        
                            {/* News Feed */}
                            <Route path='/feed' element={<Feed />} />
                            <Route path='/public-profile/:id' element={<PublicProfile />} />
                            <Route path='/view-post' element={<ViewPost />} />
                            <Route path='/view-post/:id' element={<ViewPost />} />
                        </Routes>
                    </div>
                </div>
                <BottomNavbar />
                <NotificationsModal />
                { pointsJustScored > 0 && <PointAnimation /> }
                {user.isNewUser && <NewUserWelcomeModal />}
            </div>
        )
    } else {
        return <Routes>
            {/* <Route path='/' element={<Auth />}/> */}
            <Route path='/' element={<LandingPage />}/>
            <Route path='/request-password-reset' element={<RequestPasswordReset />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
    }
    
}

export default App
