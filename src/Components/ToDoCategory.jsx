import React from 'react'
import '../Styles/ToDoCategory.css'
import { HiDotsHorizontal } from "react-icons/hi";

const ToDoCategory = () => {
    return (
        <div className='todo-parent-container'>
            <div className="todo-category-header">
                <div className="todo-header-wrapper">
                    <div className="category-indicator"></div>
                    <h5>To Do</h5>
                    <div className="total-task-number">3</div>
                </div>
            </div>

            <div className="list-item-container">
                <div className="list-item-card">
                    <div className="list-item-banner">
                        <div className="list-item-badge">Low</div>
                        <div className="list-item-option"><HiDotsHorizontal /></div>
                    </div>
                    <div className="list-item-header">
                        <h5>qwerty</h5>
                    </div>
                    <div className="list-item-content">
                        <p>Brainstorming brings team members' diverse experience into play. </p>
                    </div>
                    <div className="list-item-footer">
                        <p>Deadline: <span>12/5/24</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoCategory