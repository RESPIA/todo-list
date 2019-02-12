import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : []
    }
  }

  componentWillMount = () => {
    //console.log('call');
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }
  

  generateData = () =>{
    var tasks = [
      {
        id : this.generateId(),
        name : "Learn react js",
        status : true
      },
      {
        id : this.generateId(),
        name : "Learn Swinming",
        status : true
      },
      {
        id : this.generateId(),
        name : "Lean Voleyball",
        status : true
      }
    ];
    //console.log(tasks);
    this.setState({
      tasks : tasks
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  
  s4()
  {
    return Math.floor(1+Math.random() * 0x10000).toString(16).substring(1);
  }

  generateId()
  {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4() + this.s4() + "-" + this.s4();
  }
  
  render() {
    var { tasks } = this.state; // var tasks = this.state.tasks
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
        
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {/* form */}
            <TaskForm/>
          </div>
          
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button type="button" className="btn btn-primary">
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>

            <button type="button"
                    className="btn btn-danger"
                    onClick={this.generateData}
                    >
              <span className="fa fa-plus mr-5" />Generate data
            </button>
            <br />
            <br />
            
            {/* control search - sort */}
            <Control/>
            <br />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
