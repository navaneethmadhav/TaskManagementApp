import React from 'react'
import '../Styles/MainSection.css'
import expiredIcon from '../Assets/Icons/Expired.svg'
import activeIcon from '../Assets/Icons/activeTask.svg'
import completedIcon from '../Assets/Icons/clock.svg'
import ToDoCategory from './ToDoCategory.jsx'
import OnProgressCategory from './OnProgressCategory.jsx'
import CompletedCategory from './CompletedCategory.jsx'
import { FaPlus } from "react-icons/fa6";

const MainSection = () => {
    return (
        <div className='dashboard-body-container'>
            <div className="dashboard-sidebar">
                <div className="sidebar-section-block">
                    <div className="section-block-image1">
                        <img src={expiredIcon} alt="" />
                    </div>
                    <h5>Expired Tasks</h5>
                    <h1>5</h1>
                </div>

                <div className="sidebar-section-block">
                    <div className="section-block-image2">
                        <img src={activeIcon} alt="" />
                    </div>
                    <h5>Expired Tasks</h5>
                    <h1>5</h1>
                </div>

                <div className="sidebar-section-block">
                    <div className="section-block-image3">
                        <img src={completedIcon} alt="" />
                    </div>
                    <h5>Expired Tasks</h5>
                    <h1>5</h1>
                </div>

                <div className="task-btn-wrapper">
                    <button><span><FaPlus /> </span> Add Task</button>
                </div>
            </div>
            <div className="dashboard-list-section">
                <div className="category-container">
                    <ToDoCategory />
                </div>
                <div className="category-container">
                    <OnProgressCategory />
                </div>
                <div className="category-container">
                    <CompletedCategory />
                </div>
            </div>
        </div>
    )
}

export default MainSection