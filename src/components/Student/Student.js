import React, { Component } from 'react'
import './Student.css';

class Student extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showGrades: false,
      studentId: 0,
      newTag: ''
    }

    this.toggleButton = this.toggleButton.bind(this)
    this.handleChangeAddTag = this.handleChangeAddTag.bind(this)
  }

  handleChangeAddTag(e){
    this.setState({ newTag: e.target.value })
  }

  addTag(e){
    e.preventDefault()

    let newTag = [this.state.newTag]

    if(newTag !== ''){
        let student = this.props.student
    
        if(student.tags !== undefined) {
          newTag = newTag.concat(student.tags)
        }
        student.tags = newTag
    
        this.setState({
          newTag: ''
        })
    
        this.props.updateStudentsTags(this.props.index, student)
    }
  }

  toggleButton(id){
    this.setState({ showGrades: !this.state.showGrades})
    this.setState({ studentId: id })
  }

  render() {
    const { showGrades } = this.state
    const { studentId } = this.state

    return (
        <div key={this.props.student.id} className="box-students">
            <div className="box-student">
                <div className="pic-student">
                    <img src={this.props.student.pic} alt={this.props.student.firstName} className="img-student"></img>
                </div>
                <div className="info-student">
                    <p className="info-name-student">{this.props.student.firstName} {this.props.student.lastName}</p>
                    <p className="info-text-student">Email: {this.props.student.email}</p>
                    <p className="info-text-student">Company: {this.props.student.company}</p>
                    <p className="info-text-student">Skill: {this.props.student.skill}</p>
                    <p className="info-text-student">Average: {
                        (this.props.student.grades.reduce((a,b) => parseInt(a) + parseInt(b), 0) / this.props.student.grades.length)
                        }%</p>
                    { showGrades && studentId === this.props.student.id &&  ( 
                    
                    <div>
                        <div className="more-info-text-student">
                            {this.props.student.grades.map((grade, i) => {
                                return <p key={i} className="grades">Test {i+1}: {grade}%</p>
                            })}
                        </div>
                        
                    </div>
                        )}
                    <div className="tags-box">
                            {this.props.student.tags !== undefined && this.props.student.tags.map((tag, i) => {
                            return <span key={i} className="tag">{tag}</span>
                            })}
                        </div>
                        <div>  
                            <form onSubmit={(e) => this.addTag(e)}>
                                <input className="input-add-tag" type="text" placeholder="Add a Tag"
                                onChange={this.handleChangeAddTag} value={this.state.newTag} />
                            </form>                    
                        </div>
                    
                </div>
                <div className="more-info-student">
                    <button className="button-toogle" onClick={() => this.toggleButton(this.props.student.id)}>  
                    { showGrades && studentId === this.props.student.id ? "-" : "+" }
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default Student;
