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
	<div className="note">
	<Label bsStyle="danger">
	Note: {"\n"} I could only find one use case where this program {"\n"} would show up a wrong score.
	When the first time the user selects a correct option, for some reason the component is not getting re-rendered. But the user 
	clicks on the same right option for the 2nd time the component is getting re-rendered. Mind you this is only for the 1st
	question. Now imagine a scenerio where the user clicks on a correct option for the first question and sees he's not re-directed
	to the next question, then there's a high possibility of him clicking on the "Skip" button and hence even the right option's
	score wouldn't be counted. Due to restriction in the time, I couldn't solve this. But excluding this if you could find any other
	valid bugs feel free to tell me.
	Also due to time restriction, I couldn't do the 4th (showcasing wrong choosen ans and correct ans of the same question).
	If I had to do, I would have saved the question number and the wrong answers of them in a state(object) and later would have
	printed them along with the right answers from the state(already existing) as I would have the question number in the previous
	state.And if a write answer is selected after multiple wrong then I'll clear that part of the object.
 	Thanks.
	</Label>
        </div>
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
