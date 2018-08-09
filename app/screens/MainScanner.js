'use strict';
import Scanner from '../components/Scanner';
import React, { Component } from 'react';

export default class MainScanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scanner courseCode={this.props.courseCode}
               title={this.props.title}
               location={this.props.location}/>
    )
  }
}