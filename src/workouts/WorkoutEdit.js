import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const WorkoutEdit = (props) => {

    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) =>{
        event.preventdefault();
        fetch('http://localhost:5000/log/', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ description: editDesc, definition: editDef, result: editRes } ),
        }).then((res) => res.json())
            .then((logData) => {
                console.log('PUt', logData);
                props.fetchWorkouts();
                props.updateOff();
            })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader>Update Workout!</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="description" />
                        <Input onChange={(e) => setEditDesc(e.target.value)} name="description" value={editDesc} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition" />
                        <Input type="select" name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="result" />
                        <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" >Update Workout</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;