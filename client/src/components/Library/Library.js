import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, LibraryBook, LibraryRow } from 'react-bootstrap';
import './Library.css'
import _ from 'lodash'
import { resizeLastBook } from './utils';
import { getBooks } from '../../actions/books';
import { setCurrentBook } from '../../actions/currentBook';

function Library() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    const [viewAsRow, setViewAsRow] = useState(false);

    useEffect(() => {
        dispatch(getBooks())

        resizeLastBook()

        window.addEventListener('resize', _.throttle(resizeLastBook), 200)

        return () => window.removeEventListener('resize', _.throttle)
    }, [])

    return (
        <div className="Library">
            <Row>
                <Col style={{padding: '0px'}}>
                    <h1 >Library</h1>
                </Col>
            </Row>
            <Row className='Library__bookshelf'>
                {
                    books.map((book, i) => {
                        if (book.isCompleted) {
                            return ( 
                                <Col key={book._id + 'library'} className='Library__book-container' xs={4} sm={4} md={3} lg={2}>
                                    <Link 
                                        to={`/library-form?id=${book._id}`} 
                                        onClick={() => dispatch(setCurrentBook(book))} 
                                        className='Library__book-link' 
                                    >
                                        <img src={book.thumbnail} className='Library__book-image' />
                                    </Link>
                                </Col>
                            )
                        }
                    })
                }
            </Row>
        </div>
    )
}

export default Library;
