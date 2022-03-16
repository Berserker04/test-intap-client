import { Button, TextField } from '@mui/material'
import { Formik } from 'formik';
import React from 'react'
import Swal from 'sweetalert2';
import { API } from '../../../api';

export default function ActivityForm({ getActivities }) {
    return (
        <div>
            <h2>Registro de actividad</h2>
            <Formik
                initialValues={{ description: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.description) {
                        errors.description = 'Requiredo';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem("token");
                    if (token) {
                        const config = {
                            headers: { 'Authorization': 'Bearer ' + token }
                        }
                        API.POST("/activity", values, config).then(data => {
                            if (data.ok) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: data.message,
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                getActivities()
                            }
                        })
                    }

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
                    <form className="activity_form" onSubmit={handleSubmit}>
                        <TextField
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            id="standard-basic"
                            label="Descripción de actividad"
                            variant="standard"
                        />
                        {errors.description && touched.description && errors.description} <br />
                        <br />
                        <Button type="submit" variant="contained">Registrar</Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
