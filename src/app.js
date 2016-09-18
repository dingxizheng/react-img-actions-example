/*
* @Author: mover
* @Date:   2016-09-16 23:27:51
* @Last Modified by:   mover
* @Last Modified time: 2016-09-17 21:15:05
*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';


let imgContainerStyle = {
	width: '100%',
	height: 400,
	backgroundColor: 'grey',
	padding: 20
};

let imgStyle = {
	height: '100%',
	width: '100%',
	objectFit: 'contain'
};

let actions = [
	{
		id: 'action1',
		name: "Rotate",
		type: "transform",
		action: "rotate(45deg)",
		applied: false
	},
	{
		id: 'action2',
		name: "Translate",
		type: "transform",
		action: "translateX(-40)",
		applied: false
	},
	{
		id: 'action3',
		name: "Opacity",
		type: "opacity",
		action: "0.5",
		applied: false
	},
	{
		id: 'action4',
		name: "Scale",
		type: "transform",
		action: "scale(0.5, 0.5)",
		applied: false
	}
];


class App extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	imageSrc: '',
	  	actions: actions
	  };
	}

	applyAction(id) {
		let newActions = this.state.actions.map(a=>{ 
			if(a.id == id){
				a.applied = true;
			}
			return a;
		});
		this.setState({
			actions: newActions
		});
	}

	unapplyAction(id) {
		let newActions = this.state.actions.map(a=>{ 
			if(a.id == id){
				a.applied = false;
			}
			return a;
		});
		this.setState({
			actions: newActions
		});
	}

	handleFileChange(e) {
		let url = window.URL.createObjectURL(this.refs.localFile.files[0])
		this.setState({
			imageSrc: url
		});
	}

	renderAviliableButtons() {
		return this.state.actions.filter(a => !a.applied).map(a => (
				<div><Button onClick={()=>{this.applyAction(a.id)}}>{a.name}</Button><br/><br/></div>
			));
	}

	renderAppliedButtons() {
		return this.state.actions.filter(a => a.applied).map(a => (
				<div><Button onClick={()=>{this.unapplyAction(a.id)}}>{a.name}</Button><br/><br/></div>
			));
	}

	computedStyle() {
		let transforms = [];
		transforms = this.state.actions.filter(a => a.applied).filter(a => a.type == "transform");
		console.log(transforms);
		let computedStyle = this.state.actions
							  .filter(a => a.applied)
			                  .filter(a => a.type != "transform")
			                  .reduce((previous, current) => { 
			                  	return Object.assign({}, imgStyle, { [current.type]: current.action }) 
			                  }, imgStyle);

		return Object.assign({}, computedStyle, {
			transform: transforms.map(a => a.action).join(" ")
		});
	}

	render() {

		return (
			<Grid>
			    <Row className="show-grid">
			      <Col xs={12} md={6}>
			      	<div style={imgContainerStyle}>
			      		<img src={this.state.imageSrc} style={this.computedStyle()}>
			      		</img>
			      	</div>
			      </Col>

			      <Col xs={6} md={3}>
			      	<h4>Aviliable Actions</h4>
			      	{this.renderAviliableButtons()}
			      </Col>

			      <Col xs={6} md={3}>
			      	<h4>Applied Actions</h4>
			      	{this.renderAppliedButtons()}
			      </Col>
			    </Row>
			    <Row className="show-grid">
			      <Col xs={12} md={6}>
			      	<input ref="localFile" type="file" accept="image/*" onChange={this.handleFileChange.bind(this)}/>
			      </Col>
			      <Col xs={6} md={3}>
			      	
			      </Col>

			      <Col xs={6} md={3}>
			      	
			      </Col>
			    </Row>
			</Grid>
		);
	}
}

ReactDOM.render(
  <App/>,
  document.getElementById('app-root')
);