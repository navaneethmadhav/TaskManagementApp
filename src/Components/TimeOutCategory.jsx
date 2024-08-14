import React from 'react'

import '../Styles/TimeOutCategory.css'

import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const TimeOutCategory = () => {
    return (
        <div className='timeout-parent-container'>
            <div className="timeout-category-header">
                <div className="timeout-header-wrapper">
                    <div className="timeout-category-indicator"></div>
                    <h5>Time Out</h5>
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="list-item-footer">
                        <p>Deadline: <span>12/05/2024</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeOutCategory