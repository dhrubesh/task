import React, { Component } from 'react';
import { ButtonGroup, Button, Label } from 'react-bootstrap';

class AddProject extends Component {
  constructor(){
    super();
    this.state = {
	attempted: false,
	result: false,
	score: 0   
  	 }
  }

result(option){
	this.setState({attempted: true})
	if(option === this.props.ans){
		var score = this.state.score
		console.log("scooore")
		console.log(score) 
		this.setState({score: score + 1})
		this.setState({result: true})
		this.props.handleQuesNo()
	}else{
		this.props.handleWrongAns(option)
		this.setState({result: false})
	}
}


render() {
	return (
		<div className="main">
		{
		this.props.ques && !this.props.final
		 ? 
		<div>
			<h1>{this.props.question}</h1>
			 <ButtonGroup vertical>
			    <Button onClick={this.result.bind(this,0)} >{this.props.listvalue[0]}</Button>
			    <Button onClick={this.result.bind(this,1)}   >{this.props.listvalue[1]}</Button>
			    <Button  onClick={this.result.bind(this,2)}  >{this.props.listvalue[2]}</Button>
			    <Button   onClick={this.result.bind(this,3)} >{this.props.listvalue[3]}</Button>
			</ButtonGroup>
		</div>
		:
		<div>
		</div>
		}
		{this.state.attempted && this.state.result && !this.props.final
		?
			<div>
			 <Label bsStyle="success">Great Work</Label>
			</div> 
		:
			<div></div>
		}
		{!this.props.final 
		&&
		<div><Button onClick={this.props.handleQuesNo} bsStyle="info">Skip</Button></div>
		
		}
		{this.state.attempted && !this.state.result && !this.props.final
		?
		 	<div>
		 	<Label bsStyle="danger">Try Again!</Label>
			 </div>
		:
			 <div></div>
		}
		{this.props.final
		&&
			<div>
			<p> Great work! We're done! </p>
			<b> Your Score is : 
			{this.state.score === 0
			?
			0
			:
			<h2>{this.state.score-1}</h2>
			} </b>
			<p> Congrats! </p>
			 </div>

		}
		</div>
		 );
	  }
}


export default AddProject;
