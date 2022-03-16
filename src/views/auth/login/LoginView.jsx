import { Grid, TextField, Button } from '@mui/material'
import React from 'react'
import { Formik } from 'formik';
import "./styles.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../../../api';

export default function LoginView() {
  return (
    <Grid className="login" container sx={12}>
      <div className="bg_opacity">
        <Formik
          initialValues={{ user_name: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.user_name) {
              errors.user_name = 'Requiredo';
            } else if (!values.password) {
              errors.password = 'Requiredo';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            API.POST("/login", values).then( data  => {
              console.log(data);
              if(data.token){
                localStorage.setItem("token", data.token)
                window.location.href = "/";
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: data.error || "Credenciales invalidas",
                  showConfirmButton: false,
                  timer: 2000
                })
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
            <form className="login_form" onSubmit={handleSubmit}>
              <h1>¡Bienvenido!</h1>
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

              <Button type="submit" variant="contained">Ingresar</Button>
              <Link to="/registrar">
                <Button variant="text">¿No estas registrado? Ir a registrarse</Button>
              </Link>

            </form>
          )}
        </Formik>
      </div>

    </Grid>
  )
}
