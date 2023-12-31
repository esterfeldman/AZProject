import React, { useState, useRef, useEffect } from 'react';
import SunburstDiagram from './SunburstDiagram';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Button, InputGroup, FormControl, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';
import Form from 'react-bootstrap/Form';
import '../Styles/Home.css';
import { useUserContext } from './UserContext';
import BarChart from './BarChart';
import { Row, Col } from 'react-bootstrap';
import DotChart from './DotChart';
function HomeScreen() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('top-start');
  const [arrowElement, setArrowElement] = useState(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { styles, attributes } = usePopper(buttonRef.current, dropdownRef.current, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  function openMenu() {
    setOpen(!open);
  }

  function newCustomer() {
    navigate('/newcustomer')
  }
  function newProj() {
    navigate('/newproject')
  }
  function newEmployee() {
    navigate('/newemployee')
  }
  function newTask() {
    navigate('/newtask')
  }

  function renderAddEmployeeLabel() {
    if (user.EmployeeEmail === "anat@gmail.com") {
      return <Form.Label className="hover-label" onClick={newEmployee}>הוספת עובד</Form.Label>;
    }
    return null; // Return null if the condition is not met
  }


  return (
    <div>
      <Button className="floating-button" onClick={openMenu} ref={buttonRef}>
        <FontAwesomeIcon icon={faPlus} title="הוספת משימה" />
      </Button>
      <br />
      {open && (
        <div
          ref={dropdownRef}
          style={{
            ...styles.popper,
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f7f7f7',
          }}
          {...attributes.popper}>
          <div ref={setArrowElement} style={styles.arrow} className='menuBox' />
          <Form.Label className="hover-label" onClick={newTask}>הוספת משימה</Form.Label><br />
          <Form.Label className="hover-label" onClick={newCustomer}>הוספת לקוח</Form.Label><br />
          <Form.Label className="hover-label" onClick={newProj}>הוספת פרויקט</Form.Label><br />
          {renderAddEmployeeLabel()} {/* Render the "הוספת עובד" (Add Employee) label based on the condition */}
        </div>
      )}
      <Row>
        <Col>
          התפלגות עומס בין עובדים
        </Col>
        <Col>
        משימות פתוחות לפי רמת מורכבות
        </Col>
      </Row>
      <Row>
        <Col lg={6} className='barchart' style={{ border: '1px solid lightgrey',padding: '10px'}}>
          <BarChart />
        </Col>
        <Col  lg={1}>
        </Col>
        <Col lg={5} className='dotchart'style={{ border: '1px solid lightgrey', padding: '10px' }}>
          <DotChart />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
          <SunburstDiagram />
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
