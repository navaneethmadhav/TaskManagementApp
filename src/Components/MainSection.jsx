import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown } from 'antd';

import '../Styles/MainSection.css'
import expiredIcon from '../Assets/Icons/Expired.svg'
import activeIcon from '../Assets/Icons/activeTask.svg'
import completedIcon from '../Assets/Icons/clock.svg'
import ToDoCategory from './ToDoCategory.jsx'
import OnProgressCategory from './OnProgressCategory.jsx'
import CompletedCategory from './CompletedCategory.jsx'

import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";


const items = [
    {
        label: "Low",
        key: '0',
    },
    {
        label: "High",
        key: '1',
    },
];

const MainSection = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openCalendarModal = () => {

    };

    const closeCalendarModal = () => {
        setCalendarModalOpen(false);
    };

    const handleDeadlineClick = () => {
        setCalendarModalOpen(true);
        setIsCalendarOpen(true);
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setIsCalendarOpen(false);
        setCalendarModalOpen(false);
    };

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => item.key === e.key);
        console.log(selectedItem.label);
        
    };

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
                    <button onClick={openModal}><span><FaPlus /> </span> Add Task</button>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <button className='close-button' onClick={closeModal}><IoClose /></button>
                        <div onClick={closeModal} className="overlay"></div>
                        <div className="modal-content">
                            <div className="modal-header-container">
                                <div className='header-name'>
                                    <div className="task-indicator"></div>
                                    <h3>ADD TASK</h3>
                                </div>
                                <div className="modal-header-icon">
                                    <FaPlus />
                                </div>
                            </div>
                            <div className="modal-task-form">
                                <div className="task-input-header">
                                    <input type="text" />
                                    <Dropdown
                                        menu={{
                                            items,
                                            onClick: handleMenuClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <a>
                                            <span><HiDotsVertical /></span>
                                        </a>
                                    </Dropdown>
                                </div>
                                <div className="task-content-wrapper">
                                    <textarea name="" id=""></textarea>
                                </div>
                            </div>
                            <div className="modal-action-footer">
                                <button className='action-btn' onClick={handleDeadlineClick}>Deadline</button>
                                <button className="action-btn">Assigned to</button>

                                {calendarModalOpen && (
                                    <div className="calendar-modal">
                                        <div className="calendar-overlay"></div>
                                        <div className="calendar-modal-content">
                                            {isCalendarOpen && (
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleDateChange}
                                                    onClickOutside={() => setIsCalendarOpen(false)}
                                                    inline
                                                />
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
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