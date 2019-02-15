import React, { Component } from 'react';

class TaskItem extends Component {

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        //console.log(this.props.task.id);
    }

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
    }
    
    render() {
        var {  task,index }   = this.props;
        return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={task.status === true ? "label label-success" : "label label-danger" } >
                        {task.status === true ? "Active" : "Visibility"}
                    </span>
                    </td>
                    <td className="text-center">
                    <button type="button" onClick={this.onUpdate} className="btn btn-warning">
                        <span className="fa fa-pencil mr-5" />Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Delete
                    </button>
                    </td>
                </tr>
        );
    }
}

export default TaskItem;