import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {

    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false); //will display the workout edit component conditionally
    const [workoutToUpdate, setWorkoutToUpdate] = useState({}); //prop for workout edit; obj user clicked on; request update details

    const fetchWorkouts = () => {
        fetch('http://localhost:5000/log/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then((res) => res.json())
            .then((logData) => {
                setWorkouts(logData)
                console.log(logData);
            })
    }
    //updates out workoutToUpdate state variable based on input of function
    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }
    //toggle display
    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
                </Col>
                <Col>
                    <WorkoutTable workouts={workouts} fetchWorkouts={fetchWorkouts} editUpdateWorkout={editUpdateWorkout} updateOn={updateOn} token={props.token} />
                </Col>
                {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate} updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts} /> : <> </>}
            </Row>
        </Container>
    )
}
export default WorkoutIndex;