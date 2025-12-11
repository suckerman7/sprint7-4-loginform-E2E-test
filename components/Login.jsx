import {useState, useEffect} from 'react';
import {
    Form, FormGroup, FormFeedback, Label, Input, Button,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters long',
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        terms: '',
    });

    const [isValid, setIsValid] = useState(false);

    const history = useHistory();

    const validate = (name, value) => {
        switch (name) {
            case 'email':
                return /\S+@\S+\.\S+/.test(value) 
                ? '' : errorMessages.email;
            case 'password':
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(value)
                ? '' : errorMessages.password;
            case 'terms':
                return value
                ? '' : 'You must accept the terms';
            default:
                return '';
        }
    };

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        const fieldValue = type === 'checkbox'
        ? checked : value;

        setForm({ 
            ...form, 
            [name]: fieldValue 
        });

        setErrors({
            ...errors,
            [name]: validate(name, fieldValue),
        });
    };

    useEffect(() => {
        const noErrors =
          errors.email === '' && errors.password === '' &&
          errors.terms === '' && form.email !== '' &&
          form.password === '' && form.terms === true;
        
        setIsValid(noErrors);

    }, [errors, form]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('isValid check:', isValid);

        if (!isValid) {
            return;
        }

        axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((response) => {
            const user = response.data.find(
                (item) => item.email === form.email && item.password === form.password
            );

            if (user) {
                setForm(initialForm);
                history.push('/main');
            } else {
                history.push('/error');
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for='data-email'>Email</Label>
                <input
                id='data-email'
                name='email'
                type='email'
                placeholder='Enter your email'
                value={form.email}
                onChange={handleChange}
                invalid={!!errors.email}
                />
                {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
            </FormGroup>

            <FormGroup>
                <Label for='data-password'>Password</Label>
                <input 
                id='data-password'
                name='password'
                type='password'
                placeholder='Enter your password'
                value={form.password}
                onChange={handleChange}
                invalid={!!errors.password}
                />
                {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
            </FormGroup>

            <FormGroup check>
                <Input 
                id='data-terms'
                name='terms'
                type='checkbox'
                checked={form.terms}
                onChange={handleChange}
                invalid={!!errors.terms}
                />
                <Label 
                htmlFor='data-terms'
                check
                style={{ color: errors.terms ? 'red' : 'inherit' }}
                >
                I agree to terms of service and privacy policy
                </Label>
                {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
            </FormGroup>

            <FormGroup className="text-center p4">
                <Button color="primary" disabled={!isValid}>
                  Sign In             
                </Button>
            </FormGroup>
        </Form>
    );
}