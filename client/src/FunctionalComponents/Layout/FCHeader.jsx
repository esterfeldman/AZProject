import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import '../../Styles/Layout.css';

export default function FCHeader() {
  return (
    <div >
      <div style={{marginRight:"280px",marginTop:'15px', alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img height={'100px'} src={process.env.PUBLIC_URL + '/‏‏LogoNoText.jpg'} alt="Logo" />
      </div>
    </div >
  );
}
