import teacherCard from '../../assets/svg-pictures/teacher.svg'
import React, { useState } from 'react';
import TeachCard from './TeachCard';
import './sign-up.css'
import axiosInstance from "../../axios";
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    surname: '',
    birth_date: '',
    email: '',
    phone: '',
    password: '',
    password2: ''
  });

  let navigate = useNavigate()
  const routeHandler = (URL) => {
    navigate(URL)
  }

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.password !== formData.password2) {
      console.log('Passwords do not match');
    } else {
      console.log('Successfully signed up');
      if (formData.okayToEmail) {
        console.log('Thanks for signing up for our newsletter!');
      }
    }
    let formattedData = JSON.stringify(formData)
    axiosInstance
      .post('signup/student/', formData)
      .then(() =>
        console.log(`Data has been stored successfully: ${formattedData}`)
      )
      .catch((error) => console.log(error.response.data))
  };

  return (
    
    <div className="main">
      <Sidebar/>
        <form className="form" onSubmit={handleSubmit}>
        <h1 className='regTitle'>Регистрация ученика</h1>
        <div className="form-buttons">
          <button onClick={() => routeHandler('/regTeach')} className="form--submit" type="button">
            Регистрация репетитора
          </button>
          <button onClick={() => routeHandler('/register')} className="form--submit" type="button">
            Регистрация ученика
          </button>
        </div>
      {/* <button onClick={() => routeHandler('/regEduCent')} className="form--submit" type="submit">
        Регистрация образ. центра
      </button> */}
        <p>Информация о ребенке</p>
        <div className="input-row">
        <input
          type="text"
          placeholder="Имя"
          name="first_name"
          className="form--input"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="last_name"
          className="form--input"
          value={formData.last_name}
          onChange={handleChange}
        />
        </div>
        <div className="input-row">
        <input
          type="text"
          placeholder="Отчество"
          name="surname"
          className="form--input"
          value={formData.surname}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Дата рождения"
          name="birth_date"
          className="form--input"
          value={formData.birth_date}
          onChange={handleChange}
        />
        </div>
        <p>Контакты</p>
        <div className="input-row">
        <input
          type="email"
          placeholder="Email адрес"
          name="email"
          className="form--input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Номер Телефона"
          name="phone"
          className="form--input"
          value={formData.phone}
          onChange={handleChange}
        />
        </div>
        <p>Установите пароль</p>
        <div className="input-row">
        <input
          type="password"
          placeholder="Введите пароль"
          name="password"
          className="form--input"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          name="password2"
          className="form--input-last"
          value={formData.password2}
          onChange={handleChange}
        />
        </div>
        <button className="form--submit" type="submit" >
          Завершить регистрацию
        </button>
      </form>
    </div>
  );
};

export default SignUp;
