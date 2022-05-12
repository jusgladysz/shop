import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../models';
import { Button } from '../../shared';
import { ButtonMode } from '../../shared/button/interfaces';
import '../loginPage/style.css';
import { User } from '../../../models/user';
import { Api } from '../../../Api';

const LoginPage = (): JSX.Element => {
    const [errors, setErrors] = useState(new User());
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [dataUsers, setDataUsers] = useState([]);

    const [form, setForm] = useState(new User());

    const handleChange = (e: ChangeEvent<{ value: string; name: string }>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const findErrors = () => {
        const { email, password }: User = form;
        const newErrors: any = {};
        if (!email || email === '') {
            newErrors.email = 'E-mail is required!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'E-mail has incorrect format';
        }
        if (!password || password === '') {
            newErrors.password = 'Password is required!';
        }
        return newErrors;
    };

    let navigate = useNavigate();

    const api = new Api();

    const fetchData = async () => {
        try {
            setDataUsers(await api.get('users'));
            localStorage.setItem('userToken', 'token');
        } catch (error: any) {
            console.log(error?.response.data || error?.response.status);
        }
    };

    const handleLogin = (e: any): void => {
        e.preventDefault();
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setIsLoggedIn(true);
            fetchData();
            navigate(RoutePaths.MainPage);
            console.log(form);
        }
    };

    return (
        <div className="login">
            <form className="login__form">
                <h2 className="login__form__header">Member login</h2>
                <input
                    className="login__form__input"
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    required
                ></input>
                {errors.email && <span className="form__errors">{errors.email}</span>}
                <input
                    className="login__form__input"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    required
                ></input>
                {errors.password && errors.password !== '' ? (
                    <span className="form__errors">{errors.password}</span>
                ) : null}
                <Link to={`${RoutePaths.Login}/`} style={{ textDecoration: 'none' }}>
                    <Button
                        type="submit"
                        onClick={handleLogin}
                        mode={ButtonMode.SECONDARY}
                        children="Login"
                        disabled={!findErrors}
                    />
                </Link>
                <h4 className="login__info">Don't have an account?</h4>
                <Link to={`${RoutePaths.Register}`}>
                    <h3 className="login__info" style={{ textDecoration: 'none' }}>
                        Join us
                    </h3>
                </Link>
            </form>
        </div>
    );
};

export default LoginPage;
