import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, FormGroup, Form, Button, Label } from 'reactstrap';

const WorkoutCreate = (props) => {

    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('Distance');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('confirm token', props.token)
        console.log('confirm post values',  description, "definition: ", definition, result);

        fetch('http://localhost:5000/log/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ description: description, definition: definition, result: result } ),
        }).then((res) => res.json())
            .then((logData) => {
                console.log('POST', logData);
                setDescription(''); //reset the state variables so user can input fresh workout
                setDefinition('');
                setResult('');
                props.fetchWorkouts();
            })
    }

    return (
        <div>
            <h2> log work out </h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description" />
                    <Input onChange={(e) => setDescription(e.target.value)} name="description" value={description}  />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition" />
                    <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                        <option value="Weight">Weight</option>
                        <option value="Time">Time</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result" />
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)} />
                </FormGroup>
                <Button type="submit" >submit Workout</Button>
            </Form>
        </div>
    )
}
export default WorkoutCreate;