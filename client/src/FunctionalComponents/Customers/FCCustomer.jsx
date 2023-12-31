import React, { useState, useEffect } from 'react';
import { Accordion, Button, InputGroup, FormControl, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Customer.css';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../UserContext';

export default function FCCustomer() {
    const { path } = useUserContext();    
    const [customerGet, setCustomerGet] = useState([]);
    const [customer, setCust] = useState(customerGet);
    const [CustomerNameUpdated, SetCustomerNameUpdated] = useState(customerGet.CustomerName);
    const [CustomerEmailUpdated, SetCustomerEmailUpdated] = useState(customerGet.CustomerEmail);
    const [CustomerAdressUpdated, SetCustomerAdressUpdated] = useState(customerGet.CustomerAdress);
    const [CustomerPhoneUpdated, SetCustomerPhoneUpdated] = useState(customerGet.CustomerPhone);
    const [CustomerType, SetCustomerType] = useState(customerGet.CustomerType);
    const [CustomerIDUpdated, SetCustomerIDUpdated] = useState(customerGet.CustomerID);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const customerPK = location.state;
    const [projectGet, setprojectGet] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    function handleClick() {
        const customerDetailsUpdate = {
            CustomerName: CustomerNameUpdated || customerGet.CustomerName,
            CustomerEmail: CustomerEmailUpdated || customerGet.CustomerEmail,
            CustomerAdress: CustomerAdressUpdated || customerGet.CustomerAdress,
            CustomerPhone: CustomerPhoneUpdated || customerGet.CustomerPhone,
            CustomerType: CustomerType || customerGet.CustomerType,
            CustomerID: CustomerIDUpdated || customerGet.CustomerID,
            isPotential:"false"

        }
        setIsEditing(!isEditing);
        if (isEditing) {
            updateCustomer(customerDetailsUpdate);
            console.log("customerDetailsUpdate",customerDetailsUpdate);
        }
    }

    
    useEffect(() => {
        async function fetchCustomer() {
            try {
                const response = await fetch(`${path}CustomerDetails/${customerPK}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const json = await response.json();
                setCustomerGet(json)
            } catch (error) {
                console.error(error);
            }
        }
        fetchCustomer();
        async function showProjects() {
            try {
                const response = await fetch(`${path}Project_Cus_Task/GetProjectsAndTasks/${customerPK}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const json = await response.json();
                setprojectGet(json)
            } catch (error) {
                console.error(error);
            }
        }
        showProjects();
    }, []);

    async function updateCustomer(customerDetailsUpdate) {
        try {
            const response = await fetch(`${path}CustomerUpdate/${customerPK}`, {
                method: 'PUT',
                body: JSON.stringify(customerDetailsUpdate),
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json; charset=UTF-8'
                })
            });
    
            if (response.ok) {
                const json = await response.json();
                setCust(json);
            } else {
                throw new Error('Failed to update customer details');
            }
        } catch (error) {
            console.error(error);
        }
        setShow(true);
    }
    
    
    const passTask = (TaskID) => {
        navigate('https://proj.ruppin.ac.il/cgroup95/prod/build/task', { state: TaskID });
    }

    return (
        <div>
            <Row>
                <Col lg={12}>
                    <Toast style={{ marginBottom: '20px', width: '100%', justifyContent: 'center' }} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body style={{ backgroundColor: '#d3ffdf' }}>
                            <FontAwesomeIcon icon={faCheck} />
                            {"  "}הלקוח נשמר בהצלחה
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <Form className='projclass' style={{ margin: '0 auto', width: '95%', borderRadius: '20px ', padding: '20px' }}>
                <Accordion defaultActiveKey={['0']} alwaysOpen className="accordionCust" style={{ alignItems: 'left', direction: 'rtl' }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header style={{ alignItems: 'left', fontSize: '20px' }}>פרטי לקוח</Accordion.Header>
                        <Accordion.Body >
                            <Row >
                                <Col >
                                    <Form.Group style={{ textalign: 'right' }}>
                                        <Form.Label >כתובת אי-מייל</Form.Label>
                                        <InputGroup>
                                            <FormControl disabled={!isEditing} className='input' type="email" defaultValue={customerGet.CustomerEmail} onChange={(e) => SetCustomerEmailUpdated(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group style={{ textalign: 'right' }}>
                                        <Form.Label>מספר טלפון</Form.Label>
                                        <InputGroup style={{ textalign: 'right' }}>
                                            <FormControl disabled={!isEditing} className='input' type="tel" defaultValue={customerGet.CustomerPhone} onChange={(e) => SetCustomerPhoneUpdated(e.target.value)}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group style={{ textalign: 'right' }} controlId="CustType">
                                        <Form.Label>סוג לקוח</Form.Label>
                                        <Form.Select disabled={!isEditing} style={{ fontSize: '20px', textalign: 'right' }} value={customerGet.CustomerType} onChange={(e) => SetCustomerType(e.target.value)}>
                                            <option value="1">שעתי</option>
                                            <option value="2">חודשי</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group style={{ textalign: 'right' }} className="" controlId="formBasicEmail">
                                        <Form.Label >שם הלקוח</Form.Label>
                                        <InputGroup>
                                            <FormControl disabled={!isEditing} style={{ textalign: 'right' }} className='input' type="text" defaultValue={customerGet.CustomerName} onChange={(e) => SetCustomerNameUpdated(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group style={{ textalign: 'right' }} className="" controlId="formBasicPassword">
                                        <Form.Label className='id' >ח"פ/ ת"ז</Form.Label>
                                        <InputGroup>
                                            <FormControl disabled={!isEditing} style={{ textalign: 'right' }} className='input' type="tel" defaultValue={customerGet.CustomerID} onChange={(e) => SetCustomerIDUpdated(e.target.value)}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group style={{ textalign: 'right' }} className="" controlId="formBasicPassword">
                                        <Form.Label>כתובת</Form.Label>
                                        <InputGroup>
                                            <FormControl disabled={!isEditing} style={{ textalign: 'right' }} className='input' type="text" defaultValue={customerGet.CustomerAdress} onChange={(e) => SetCustomerAdressUpdated(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={{ textalign: "center" }}>
                                    <Button className='btn-gradient-purple_Customer' type='button' onClick={handleClick} >
                                        {isEditing ? "שמירה" : "עריכה"}
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Form>
            <Row style={{ width: '95%', margin: '0 auto', fontSize: '20px'  }}>
                <Col className='projclass' style={{ width: '95%', borderRadius: '20px ', margin: '20px', padding: '20px' }}>
                    פרויקטים
                    {projectGet
                        .filter((project) => project.ProjectName)
                        .map((project) => (
                            <Accordion className="accordionProj" style={{ direction: 'rtl' }}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header className='headeracc' style={{ textAlign: 'right', justifyContent: 'start' }}>
                                        {project.ProjectName}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {project.Tasks.map(task => (
                                            <Row style={{ marginRight: '50px' }}>
                                                <Col key={task.TaskID} className="taskname" onClick={() => passTask(task.TaskID)}>
                                                    {task.TaskName}
                                                </Col>
                                                <Col className="taskdate" style={{ marginRight: '100px', textAlign: 'left', marginLeft: '100px' }}>
                                                    {new Date(task.Deadline).toLocaleDateString('en-GB')}
                                                </Col>
                                            </Row>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                </Col>
            </Row>
        </div >

    )
}
