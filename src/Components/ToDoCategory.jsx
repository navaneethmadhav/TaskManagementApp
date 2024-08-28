import React, { useEffect, useRef, useState } from 'react'
import { Dropdown } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal';

import '../Styles/ToDoCategory.css'

import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { HiDotsHorizontal } from "react-icons/hi";


const items = [
    {
        label: "Change Status",
        disabled: true,
    },
    {
        type: 'divider',
    },
    {
        label: "On Progress",
        key: '0',
    },
    {
        label: "Completed",
        key: '1',
    },
];

const ToDoCategory = () => {

    const options = {
        autoClose: 3000,
        hideProgressBar: false,
        position: "top-right",
        pauseOnHover: false,
    };

    const [taskData, setTaskData] = useState([]);
    const [newTaskCount, setNewTaskCount] = useState(0);
    const [showList, setShowList] = useState(false);
    const actionListRef = useRef(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [taskHeading, setTaskHeading] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("new");
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const getTaskData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/get-tasks`);
        // console.log(result);

        setTaskData(result.data.tasks);

        const newTasks = result.data.tasks.filter(task => task.task_status === "new");
        setNewTaskCount(newTasks.length);
    }

    const toggleActionList = (index) => {
        setShowList(showList === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (actionListRef.current && !actionListRef.current.contains(event.target)) {
            setShowList(false);
        }
    };

    // for deleting the task
    const handleDelete = async (id) => {
        try {

            const result = await axios.delete(`${process.env.REACT_APP_SERVER_BASEURL}/delete-task/${id}`)
            // console.log(result);

            if (result.data.statusCode === 200) {
                toast.success(result.data.message, options);
                window.location.reload();
            }


        } catch (error) {
            // console.log(error);

        }
    }

    // Function to open the modal
    const openEditModal = (taskId) => {
        const taskToEdit = taskData.find(task => task.task_id === taskId);
        setTaskHeading(taskToEdit.task_heading);
        setTaskDescription(taskToEdit.task_description)
        setEndDate(taskToEdit.end_date)
        setSelectedTask(taskToEdit)
        setShowList(false);
        setEditModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setEditModalOpen(false);
    };

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => item.key === e.key);
        setTaskStatus(selectedItem.label);
    };

    const handleDeadlineClick = () => {
        setCalendarModalOpen(true);
        setIsCalendarOpen(true);
    };

    const handleDateChange = (date) => {
        // console.log(date.toLocaleDateString());

        setEndDate(date.toLocaleDateString());
        setIsCalendarOpen(false);
        setCalendarModalOpen(false);
    };

    const handleEditTask = async (id) => {

        try {

            const body = {
                id,
                taskHeading,
                taskDescription,
                taskStatus,
                endDate
            }

            const result = await axios.put(`${process.env.REACT_APP_SERVER_BASEURL}/update-task/${id}`, body);
            // console.log(result);

            if (result.data.statusCode === 200) {
                setEditModalOpen(false);
                toast.success(result.data.message, options);
                window.location.reload();
            }


        } catch (error) {
            // console.log(error);
        }

    }


    useEffect(() => {
        getTaskData()
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [actionListRef]);

    return (
        <div className='todo-parent-container'>
            <div className="todo-category-header">
                <div className="todo-header-wrapper">
                    <div className="category-indicator"></div>
                    <h5>To Do</h5>
                    <div className="total-task-number">{newTaskCount}</div>
                </div>
            </div>

            {taskData
                .filter(task => task.task_status === "new")
                .map((task, i) => (
                    <div className="list-item-container" key={i}>
                        <div className="list-item-card">
                            <div className="list-item-banner">
                                {task.task_priority === "Low" ? (
                                    <div className="list-item-badge">{task.task_priority}</div>
                                ) : (
                                    <div className="priority-item-badge">{task.task_priority}</div>
                                )}

                                <div className="list-item-option" onClick={() => toggleActionList(i)}><HiDotsHorizontal /></div>

                                {showList === i && (
                                    <ul ref={actionListRef} className="task-list-action">
                                        <li className='task-list-option' style={{ cursor: 'pointer' }} onClick={() => openEditModal(task.task_id)}>Edit</li>
                                        <li className='task-list-option' style={{ cursor: 'pointer' }} onClick={() => handleDelete(task.task_id)} >Delete</li>
                                    </ul>
                                )}
                            </div>

                            <Modal show={isEditModalOpen} onHide={closeModal}>
                                <div className="edit-modal-content">
                                    <div className="modal-header-container">
                                        <div className='header-name'>
                                            <div className="task-indicator"></div>
                                            <h3>EDIT TASK</h3>
                                        </div>
                                        <div className="modal-header-icon">
                                            <FaPlus />
                                        </div>
                                    </div>
                                    <div className="modal-task-form">
                                        <div className="task-input-header">
                                            <input type="text" placeholder='Heading' value={taskHeading} onChange={(e) => setTaskHeading(e.target.value)} />
                                            <Dropdown
                                                menu={{
                                                    items,
                                                    selectable: true,
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
                                            <textarea name="" id="" placeholder='Description' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-action-footer">
                                        <button className='action-btn' onClick={handleDeadlineClick}>Deadline</button>
                                        <button className="action-btn" onClick={() => handleEditTask(selectedTask.task_id)} >Assigned to</button>

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
                                    </div>
                                </div>
                            </Modal>

                            <div className="list-item-header">
                                <h5>{task.task_heading}</h5>
                            </div>
                            <div className="list-item-content">
                                <p>{task.task_description}</p>
                            </div>
                            <div className="list-item-footer">
                                <p>Deadline: <span>{task.end_date}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ToDoCategory