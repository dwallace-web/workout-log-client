const { useState } = require("react");
const { Form, FormGroup, Label, Input, Button } = require("reactstrap");

const Signup = (props) => {

    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/user/register', {
            method: 'POST',
            body: JSON.stringify({username : username, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(
            (res) => res.json()
        )
        .then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">username</Label>
                    <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <Button type="submit">
                    Signup
                </Button>
            </Form>
        </div>
    )
}

export default Signup;