import React from 'react';
import '../Styles/OnProgressCategory.css'
import { HiDotsHorizontal } from "react-icons/hi";

const OnProgressCategory = () => {
    return (
        <div className='onprogress-parent-container'>
            <div className="onprogress-category-header">
                <div className="onprogress-header-wrapper">
                    <div className="category-indicator"></div>
                    <h5>On Progress</h5>
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

export default OnProgressCategory