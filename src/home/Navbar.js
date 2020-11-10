import React, { useState } from 'react';
import {
    Button,
    Collapse,
    Navbar, 
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';

const Sitebar = (props) => {

    const [isOpen , setIsOpen ] = useState(false);
    
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    return (
        <Navbar color="success" light expands="md">
            <NavbarBrand href="/"> Workout Log </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={props.clickLogout}> Logout </Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        
    )
}

export default Sitebar;