import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Redux Actions
import { createComment } from '../../../../actions/currentPost'
// Bootstrap
import {Col, Container, Row, Post, Card, Form, Button, InputGroup} from 'react-bootstrap'
// Style
import './CommentForm.css'

const CommentForm = () => {
    const user = useSelector((state) => state.auth)
    const postId = useSelector((state) => state.currentPost._id)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState('')
    const [inlineStyle, setInlineStyle] = useState({})
    // const [showForm, setShowForm] = useState(true)

    const handleSubmit = () => {
        dispatch(createComment(postId, formData, user))
        setFormData('')
    }

    const handleChange = (e) => {
        setFormData(e.target.value)
        setInlineStyle({ height: e.target.scrollHeight + 'px' });
    }

    return (
        <Form className='CommentForm'>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control style={inlineStyle} className='CommentForm__input' as='textarea' value={formData} onChange={(e) =>handleChange(e)}/>
            </Form.Group>
            <Form.Group className='d-flex justify-content-end align-items-end'>
                <Button className=' submit-comment-btn' onClick={handleSubmit}>Comment</Button>
            </Form.Group>
        </Form>
    )
}

export default CommentForm