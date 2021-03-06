import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import './CurrentlyReadingCard.css'

function CurrentlyReadingCard({ book, disableZoom, overrideUser }) {
    let user = useSelector((state) => state.auth)
    if (overrideUser) user = overrideUser
    const books = useSelector((state) => state.books)

    const {title, subtitle, author, currentPage, numberOfPages, thumbnail } = book

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)


    useEffect(() => {
        const pagesLeft = numberOfPages - currentPage
        const pagesPerMinute = user.wordsPerMinute / 275

        let num = Math.round(pagesLeft / pagesPerMinute, 10);
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);

        setHours(rhours)
        setMinutes(rminutes)
    }, [books])
    
    return (
        <Card className={disableZoom ? 'CurrentlyReadingCard-no-zoom  box-shadow' : 'CurrentlyReadingCard box-shadow'} >
            <Card.Body className="CurrentlyReadingCard__body">
                <Col xs={2} className='CurrentlyReadingCard__book-icon-container'>
                    {
                        thumbnail
                        ?
                        <img src={thumbnail}/>
                        :
                        <FontAwesomeIcon icon={faBook} />
                    }
                </Col>
                <Col xs={10}>
                    <div className='CurrentlyReadingCard__body-right' >
                        <p className='CurrentlyReadingCard__title'>{title}</p>
                        <p className='CurrentlyReadingCard__subtitle'>{subtitle}</p>
                        <p className='CurrentlyReadingCard__author'>By {author}</p>
                        <div className='CurrentlyReadingCard__bottom-section'>
                            { isFinite(hours) || isFinite(minutes) ? <p className='CurrentlyReadingCard__time'>Completion Time: {`${hours}h ${minutes}m`}</p> : undefined }
                            <div className='CurrentlyReadingCard__pages-container'>
                                <div className="CurrentlyReadingCard__pages-col">
                                    <p className='CurrentlyReadingCard__pages'>Page: {`${currentPage} / ${numberOfPages}`}</p>
                                </div>
                                <Col>
                                    <ProgressBar variant='warning' now={book.currentPage / book.numberOfPages * 100} className='CurrentlyReadingCard__ProgressBar'/>
                                </Col>
                            </div>
                        </div>
                    </div>
                </Col>
            </Card.Body>
        </Card>
    );
}

export default CurrentlyReadingCard;
