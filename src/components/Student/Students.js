import React, { Component } from 'react'
import '../../App.css'
import Student from '../Student/Student'
// Testing
const API = 'https://www.hatchways.io/api/assessment/students'

class Students extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      searchName: '',
      searchTag: ''
    }

    this.handleChangeSearchName = this.handleChangeSearchName.bind(this)
    this.handleChangeSearchTag = this.handleChangeSearchTag.bind(this)
    this.updateStudentsTags = this.updateStudentsTags.bind(this)
  }

  componentWillMount() {
    localStorage.getItem('students') && this.setState({
      students: JSON.parse(localStorage.getItem('students'))
    })
  }

  componentDidMount(){
    // localStorage.clear();
    if(!localStorage.getItem('students')) {
      this.fetchData();
    }
  }

  fetchData() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ students: data.students }))
      .catch(error => console.log('parsing failed', error))
  }

  handleChangeSearchName(e) {
    this.setState({ searchName: e.target.value })
  }

  handleChangeSearchTag(e) {
    this.setState({ searchTag: e.target.value })
  }

  updateStudentsTags(index, student){
    let students = [...this.state.students]
    students[index] = student
    this.setState({ students })
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('students', JSON.stringify(nextState.students))
  }


  render() {
    const { searchName } = this.state
    const { searchTag } = this.state

    var allStudents
    var searchByName
    var searchByTag
    allStudents = this.state.students
    searchByName = this.state.searchName.trim().toLowerCase();
    searchByTag = this.state.searchTag.trim().toLowerCase();
    
    if(searchByName.length > 0){
      allStudents = allStudents.filter(student => {
        let isSearchByName = student.firstName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 || student.lastName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;
        // let isSearchByTag = this.state.searchTag.length > 0 ? student.tags.join('').indexOf(this.state.searchTag) !== -1 : true;
        return isSearchByName
      })
      
    }
    
    if(searchByTag.length > 0){
      allStudents = allStudents.filter(student => {
        return student.tags !== undefined && student.tags.some(tag => {
          return tag.toLowerCase().match(searchTag)
        })
      })
    }

    return (
      <div className="container">
        <div>
          <input className="input-search" type="text" placeholder="Search by name"
          value={this.state.searchName} onChange={this.handleChangeSearchName} />
        </div>
        <div>
          <input className="input-search" type="text" placeholder="Search by tag"
          value={this.state.searchTag} onChange={this.handleChangeSearchTag} />
        </div>
        {
          allStudents.map((student, index) => {
            return (
              <Student 
                key={index}
                student={student}
                index={index}
                updateStudentsTags={this.updateStudentsTags}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Students;
