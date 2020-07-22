import React from "react";
import {connect} from "react-redux";

import DisconnectButton from "../DisconnectButton/DisconnectButton";
import './Header.css'

const Header = (props) => {
  console.log('header props', props);
  return (
    <div className="header">
      <p className='header-name'>{props.name}</p>
      <div className="header-button">
        <DisconnectButton />
      </div>
    </div>
  );
};

function mapStateToProps(state){
  return {
    name: state.name
  }
}

export default connect(mapStateToProps)(Header)
