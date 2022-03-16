import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ActivityTimeList({ data }) {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 200,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {
                !data.length && (
                    <p>Sin fechas registradas</p>
                )
            }
            {data.map((item) => (
                <ListItem key={`item-${item}`}>
                    <ListItemText primary={`${item.date} - ${item.time_hour} ${item.time_hour > 1 ? "Horas" : "Hora"}`} />
                </ListItem>
            ))}
        </List>
    );
}