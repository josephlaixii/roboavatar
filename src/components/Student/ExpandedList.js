import React, { Component } from 'react';

class ExpandedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInput: ''
    };
  }

  updateInputText = (e) => {
    this.setState({
      tagInput: e.target.value
    })
  }

 handleInputTag = (e) => {
   if (e.key === 'Enter') {
     this.props.addTagHandler(this.props.id, this.state.tagInput)
     this.setState({
       tagInput: ''
     })
   }
 }

  render() {
      return (
        <div>
          <div className="gradeList">
            {this.props.grades.map( (grade, index) => <p key={index}>Test {index + 1}:  {grade}%</p>)}
          </div>
          {this.props.tags.map(tag => <button className="tag">{tag}</button>)}
          <input className="searchbar" type="text" placeholder="Add a tag"  value={this.state.tagInput} onChange={this.updateInputText} onKeyPress={this.handleInputTag}/>
        </div>
      );
    }
}

export default ExpandedList;
