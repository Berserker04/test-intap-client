import * as React from 'react';
import { Grid } from '@mui/material';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import { API } from '../../api';

export default function HomeView() {
  const [activities, setActivities] = React.useState([]);

  const getActivities = React.useCallback(
    async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: { 'Authorization': 'Bearer ' + token }
        }
        await API.GET("/activity", config).then(data => {
          if (data.ok) {
            setActivities(data.data)
          }
        })
      }
    }, [])

  React.useEffect(() => {
    getActivities()
  }, [getActivities])

  return (
    <Grid container spacing={2} style={{ padding: "0 4rem" }}>
      <Grid sx="12" md={6}>
        <ActivityForm getActivities={getActivities} />
      </Grid>
      <Grid sx="12" md={6}>
        <ActivityList activities={activities} getActivities={getActivities} />
      </Grid>
    </Grid>
  );
}