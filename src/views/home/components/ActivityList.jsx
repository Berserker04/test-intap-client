import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import ActivityTimeList from './ActivityTimeList';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ActivityTimeForm from './ActivityTimeForm';

export default function ActivityList({ activities, getActivities }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [open, setOpen] = React.useState(false);
    const [activity_id, setSctivity_id] = React.useState("");

    const handleOpen = (id) => {
        setSctivity_id(id)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <h2>Lista de actividades</h2>
            {
                !activities.length && (
                    <p>No hay actividades registradas</p>
                )
            }
            {
                activities.map((activity, index) => (
                    <Accordion key={index} expanded={expanded === activity.id} onChange={handleChange(activity.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {activity.description}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Registrados: {activity.activity_times.length || 0}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button type="button" variant="contained" onClick={()=>handleOpen(activity.id)}> <Add /> Agregar tiempo</Button>
                            <hr />
                            <ActivityTimeList data={activity.activity_times} />
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ActivityTimeForm getActivities={getActivities} activity_id={activity_id} handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 10
};
