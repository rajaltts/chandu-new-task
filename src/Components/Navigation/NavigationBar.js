import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = (props) => {
  return (
    <Breadcrumbs className="App-Breadcrumbs">
      <Link color="inherit" to="/">
        {props.navigationText}
      </Link>
      {props.children}
    </Breadcrumbs>
  )
}

export default NavigationBar;