import { Button, TextField } from '@mui/material'
import { Formik } from 'formik';
import React from 'react'
import Swal from 'sweetalert2';
import { API } from '../../../api';

export default function ActivityTimeForm({ getActivities, activity_id, handleClose }) {
    return (
        <div>
            <h2>Registro tiempo de actividad</h2>
            <Formik
                initialValues={{ date: '', time_hour: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.date) {
                        errors.date = 'Requiredo';
                    } else if (!values.time_hour) {
                        errors.time_hour = 'Requiredo';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem("token");
                    if (token) {
                        const config = {
                            headers: { 'Authorization': 'Bearer ' + token }
                        }
                        const sendData = { ...values, activity_id }
                        console.log(sendData);
                        API.POST("/activityTime", sendData, config).then(data => {
                            if (data.ok) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: data.message,
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                handleClose()
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
                            type="date"
                            name="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date}
                            id="standard-basic"
                            label="Fecha"
                            variant="standard"
                        />
                        {errors.date && touched.date && errors.date} <br />

                        <TextField
                            type="number"
                            name="time_hour"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.time_hour}
                            label="Tiempo en horas"
                            variant="standard"
                            inputProps={{ maxLength: 8 }}
                        />
                        {errors.time_hour && touched.time_hour && errors.time_hour} <br />

                        <br />

                        <Button type="submit" variant="contained">Agregar</Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
