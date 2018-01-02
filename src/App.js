import React, { Component } from 'react';
import $ from 'jquery';
import ShowQuestions from './Components/ShowQuestions';
import './App.css';
import { Label} from 'react-bootstrap' ;

class App extends Component {
  constructor(){
    super();
    this.state = {
    	question: [],
	listvalue: [],
	answer:5,
	quesNo:0,
	final: false,
	wrong: {},
	}
  }

  getData(){
    $.ajax({
      url: 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json',
      dataType:'json',
      cache: false,
      success: function(data){
        console.log(data);
	this.setState({questions: data})
	this.setState({quesNo: 0})
  	this.ques()
    }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

ques(){
	var listvalue = this.state.questions[this.state.quesNo].options.map(x => x );
	this.setState({listvalue: listvalue})
	var answer = this.state.questions[this.state.quesNo].answer  
	this.setState({ans: answer})
	var question = this.state.questions[this.state.quesNo].text
	this.setState({question: question})
}

handleWrongAns(ans){
	console.log("Question number:")
	console.log(this.state.quesNo+1)
	console.log("Selected Wrong ans:")
	console.log(ans+1)
}

handleQuesNo(){
	if(this.state.quesNo === 7){
		this.setState({final: true})
	}else{
		var quesNumber = this.state.quesNo
		this.setState({quesNo: quesNumber + 1})
		this.ques()
	}
}

componentDidMount(){
	this.getData();
}


  
  render() {
    return (
      <div className="App">
	<ShowQuestions
	ques={this.state.questions}
	listvalue={this.state.listvalue} 
	ans={this.state.ans}
	question={this.state.question}
	handleQuesNo={this.handleQuesNo.bind(this)}
	final={this.state.final}
	handleWrongAns={this.handleWrongAns.bind(this)}
/>
        <hr />
      </div>
    ); 
}
}
export default App;
