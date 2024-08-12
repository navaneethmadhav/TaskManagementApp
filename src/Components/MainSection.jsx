import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown } from 'antd';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';


import '../Styles/MainSection.css'
import expiredIcon from '../Assets/Icons/Expired.svg'
import activeIcon from '../Assets/Icons/activeTask.svg'
import completedIcon from '../Assets/Icons/clock.svg'
import successIcon from '../Assets/Icons/Tick Square.svg'
import ToDoCategory from './ToDoCategory.jsx'
import OnProgressCategory from './OnProgressCategory.jsx'
import CompletedCategory from './CompletedCategory.jsx'

import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";


const items = [
    {
        label: "Choose Priority",
        disabled: true,
    },
    {
        type: 'divider',
    },
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

    const options = {
        autoClose: 3000,
        hideProgressBar: false,
        position: "top-right",
        pauseOnHover: false,
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [todayDate, setTodayDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [taskHeading, setTaskHeading] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("Low");
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [activeTaskData, setActiveTaskData] = useState(0);
    const [expiredTaskData, setExpiredTaskData] = useState(0);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDeadlineClick = () => {
        setCalendarModalOpen(true);
        setIsCalendarOpen(true);
        setTodayDate(new Date());
    };

    const handleDateChange = (date) => {
        // console.log(date.toLocaleDateString());

        setEndDate(date.toLocaleDateString());
        setIsCalendarOpen(false);
        setCalendarModalOpen(false);
    };

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => item.key === e.key);
        setTaskPriority(selectedItem.label);
    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    // Function to close the modal
    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
    };

    const handleAddTask = async () => {

        if (!taskHeading.trim() || !taskPriority.trim() || !taskDescription.trim() || !endDate) {
            toast.error("All fields are required", options);
            return;
        }

        const id = nanoid(5)

        const body = {
            id,
            taskHeading,
            taskPriority,
            taskDescription,
            endDate,
            status: "new"
        }

        // console.log(body);

        const result = await axios.post(`${process.env.REACT_APP_SERVER_BASEURL}/tasks`, body);
        // console.log(result);

        if (result.data.statusCode === 200) {
            setModalOpen(false);
            toast.success(result.data.message, options);
            // openSuccessModal();
            window.location.reload();
        }

    }

    const getTaskData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/get-tasks`);
        // console.log(result);

        setTaskData(result.data.tasks);

        const newTasks = result.data.tasks.filter(task => task.task_status === "Completed");
        setCompletedTaskCount(newTasks.length);

        const activeTasks = result.data.tasks.filter(
            task => task.task_status === "new" || task.task_status === "On Progress"
        );
        setActiveTaskData(activeTasks.length);

        const today = new Date();
        
        const expiredTasks = result.data.tasks.filter(task => {
            const endDate = new Date(task.end_date); // Parse the date
            return endDate < today;
        })

        setExpiredTaskData(expiredTasks.length);
        
    }

    useEffect(() => {
        getTaskData()
    }, [])

    return (
        <div className='dashboard-body-container'>
            <div className="dashboard-sidebar">
                <div className="sidebar-section-block">
                    <div className="section-block-image1">
                        <img src={expiredIcon} alt="" />
                    </div>
                    <h5>Expired Tasks</h5>
                    <h1>{expiredTaskData}</h1>
                </div>

                <div className="sidebar-section-block">
                    <div className="section-block-image2">
                        <img src={activeIcon} alt="" />
                    </div>
                    <h5>All Active Tasks</h5>
                    <h1>{activeTaskData}</h1>
                </div>

                <div className="sidebar-section-block">
                    <div className="section-block-image3">
                        <img src={completedIcon} alt="" />
                    </div>
                    <h5>Completed Tasks</h5>
                    <h1>{completedTaskCount}</h1>
                </div>

                <div className="task-btn-wrapper">
                    <button onClick={openModal}><span><FaPlus /> </span> Add Task</button>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        {/* <button className='close-button' onClick={closeModal}><IoClose /></button> */}
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
                                    <input type="text" placeholder='Heading' onChange={(e) => setTaskHeading(e.target.value)} />
                                    <Dropdown
                                        menu={{
                                            items,
                                            selectable: true,
                                            defaultSelectedKeys: ['0'],
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
                                    <textarea name="" id="" placeholder='Description' onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-action-footer">
                                <button className='action-btn' onClick={handleDeadlineClick}>Deadline</button>

                                {calendarModalOpen && (
                                    <div className="calendar-modal">
                                        <div className="calendar-overlay"></div>
                                        <div className="calendar-modal-content">
                                            {isCalendarOpen && (
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleDateChange}
                                                    dateFormat="dd/MM/yyyy"
                                                    // onClickOutside={() => setIsCalendarOpen(false)}
                                                    inline
                                                />
                                            )}

                                        </div>
                                    </div>
                                )}

                                <button className="action-btn" onClick={handleAddTask}>Assigned to</button>

                                {successModalOpen && (
                                    <div className="success-modal">
                                        <div onClick={closeSuccessModal} className="success-modal-overlay"></div>
                                        <div className="success-modal-content">
                                            <div className="success-icon-container">
                                                <img src={successIcon} alt="" />
                                            </div>
                                            <div className='success-modal-text'><p>new task has been created successfully</p></div>
                                            <button onClick={closeSuccessModal}>Back</button>
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

            <div className="category-slider">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="category-container">
                            <ToDoCategory />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="category-container">
                            <OnProgressCategory />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="category-container">
                            <CompletedCategory />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default MainSection