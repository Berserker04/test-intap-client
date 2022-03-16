import { Grid, TextField, Button } from '@mui/material'
import React from 'react'
import { Formik } from 'formik';
import "./styles.css"
import { Link } from 'react-router-dom';
import { API } from '../../../api';
import Swal from 'sweetalert2';

export default function RegisterView() {
  return (
    <Grid className="register" container sx={12}>
      <div className="bg_opacity">
        <Formik
          initialValues={{ full_name: '', user_name: '', password: '', password_confirmation: '' }}
          validate={values => {
            const errors = {};
            if (!values.user_name) {
              errors.user_name = 'Requiredo';
            } else if (values.password.length < 8) {
              errors.user_name = 'La contraseña es de minimo 8 caracteres';
            }
            if (values.password !== values.password_confirmation) {
              errors.password = 'Las contraseñas no coinciden';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            API.POST("/register", values).then( data  => {
              if(data.token){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Usuario registrao',
                  showConfirmButton: false,
                  timer: 2000
                })
                localStorage.setItem("token", data.token)
                window.location.href = "/";
              }
            })
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="register_form" onSubmit={handleSubmit}>
              <h1>Registrate</h1>
              <TextField
                name="full_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.full_name}
                id="standard-basic"
                label="Nombre completo"
                variant="standard"
              />
              {errors.full_name && touched.full_name && errors.full_name}

              <TextField
                name="user_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.user_name}
                id="standard-basic"
                label="Usuario"
                variant="standard"
              />
              {errors.user_name && touched.user_name && errors.user_name}

              <TextField
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                id="standard-basic"
                label="Contraseña"
                variant="standard" />
              {errors.password && touched.password && errors.password}

              <TextField
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password_confirmation}
                id="standard-basic"
                label="Confirmar contraseña"
                variant="standard" />
              {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
              <br />
              <Button type="submit" variant="contained">Registrar</Button>
              <Link to="/login">
                <Button variant="text">Ya tengo un usuario Ir al login</Button>
              </Link>
            </form>
          )}
        </Formik>
      </div>

    </Grid>
  )
}
