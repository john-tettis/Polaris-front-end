import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API.js'
import { Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import UserContext from '../Context.js'





const formDefault={
    password:'',
    email:''
}
export default function Login(){
    const [formData, setFormData] =useState(formDefault)
    const navigate = useNavigate();
    const [user,setUser] = useContext(UserContext)
    const[error,setError] = useState('')

    function handleChange(e){
        setFormData(d=>({...d,[e.target.id]:e.target.value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        const result = await API.auth.login(formData)
        if(!result) return setError('Invalid credentials')
        if(result.token){
            setUser({token:result.token})
            navigate('/astro-view')
        }
    }





    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="sky-View@polaris.com" value={formData.email}onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="ConstellationLover225" value={formData.password}onChange={handleChange} />
                </FormGroup>
                <FormFeedback invalid>{error}</FormFeedback>
                <Button color="primary">Log In</Button>
            </Form>

        </div>
      
    );
}
