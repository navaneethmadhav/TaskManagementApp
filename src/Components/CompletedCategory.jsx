import React from 'react'
import '../Styles/CompletedCategory.css'
import { HiDotsHorizontal } from "react-icons/hi";

const CompletedCategory = () => {
    return (
        <div className='completed-parent-container'>
            <div className="completed-category-header">
                <div className="completed-header-wrapper">
                    <div className="category-indicator"></div>
                    <h5>Done</h5>
                    <div className="total-task-number">3</div>
                </div>
            </div>
            <div className="list-item-container">
                <div className="list-item-card">
                    <div className="list-item-banner">
                        <div className="completed-item-badge">Completed</div>
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

export default CompletedCategory