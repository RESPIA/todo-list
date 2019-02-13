import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDissplayForm : false
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
  

  // generateData = () =>{
  //   var tasks = [
  //     {
  //       id : this.generateId(),
  //       name : "Learn react js",
  //       status : true
  //     },
  //     {
  //       id : this.generateId(),
  //       name : "Learn Swinming",
  //       status : false
  //     },
  //     {
  //       id : this.generateId(),
  //       name : "Lean Voleyball",
  //       status : true
  //     }
  //   ];
  //   //console.log(tasks);
  //   // s

  //   localStorage.setItem('tasks',JSON.stringify(tasks));
  // }
  
  s4()
  {
    return Math.floor(1+Math.random() * 0x10000).toString(16).substring(1);
  }

  generateId()
  {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4() + this.s4() + "-" + this.s4();
  }
  

  // toggle Form
  ToggleForm = () => {
    this.setState({
      //this.sisDissplayForm : !isDissplayForm
      isDissplayForm : !this.state.isDissplayForm
    })
  }

  onCloseForm = () => {
    console.log("Call");
    this.setState({
      //this.sisDissplayForm : !isDissplayForm
      isDissplayForm : false
    })
  }

  // Recive data from TaskForm
  onSubmit = (data) => {
    var { tasks } = this.state;
    data.id = this.generateId();
    //console.log(data);
    tasks.push(data);
    this.setState({
        tasks : tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.onCloseForm();
  }

  
  onDelete = (id) => {
    var {tasks} = this.state;
    var index  = this.findIndex(id);
    if(index !== -1)
    {
      tasks.splice(index,1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    //console.log(id);

    this.onCloseForm();
  }
  

  // update status throw id
  onUpdateStatus = (id) =>{
    //console.log(id);
    var { tasks } = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if(index !== -1)
    {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }    

  }


  findIndex = (id) =>{
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index)=>{
      if(task.id === id)
      {
        result = index
      }
    });
    return result;
  }



  render() {
    var { tasks,isDissplayForm } = this.state; // var tasks = this.state.tasks
                                                          // Close form
    var elmTaskForm = isDissplayForm === true ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} /> : "";
    //console.log(tasks);
    return (
      <div className="container">
        <div className="text-center">
          <h1>Manager Job</h1>
          <hr />
        </div>
        <div className="row">
        
          <div className={ isDissplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
            {/* form */}

            {elmTaskForm}
          </div>
          
          <div className={ isDissplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
            <button type="button" className="btn btn-primary" onClick={this.ToggleForm}>
              <span className="fa fa-plus mr-5" />New Todolist
            </button>

           
            <br />
            <br />
            
            {/* control search - sort */}
            <Control/>
            <br />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onUpdateStatus={this.onUpdateStatus} onDelete={ this.onDelete } tasks={tasks}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
