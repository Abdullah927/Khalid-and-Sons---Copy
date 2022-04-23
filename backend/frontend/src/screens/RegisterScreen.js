import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted')
        if (password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'> 
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter Your Full Name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'> 
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'> 
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className='my-3'> 
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type='password' placeholder='Confirm Your Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'className='my-3'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
