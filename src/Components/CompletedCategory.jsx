import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown } from 'antd';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal';

import '../Styles/CompletedCategory.css'
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

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
];

const CompletedCategory = () => {

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
    const [taskStatus, setTaskStatus] = useState("On Progress");
    const [selectedTask, setSelectedTask] = useState(null);

    const getTaskData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/get-tasks`);
        // console.log(result);

        setTaskData(result.data.tasks);

        const newTasks = result.data.tasks.filter(task => task.task_status === "Completed");
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

    const closeModal = () => {
        setEditModalOpen(false);
    };

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => item.key === e.key);
        setTaskStatus(selectedItem.label);
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

            // console.log(body);


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
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [actionListRef]);

    return (
        <div className='completed-parent-container'>
            <div className="completed-category-header">
                <div className="completed-header-wrapper">
                    <div className="completed-category-indicator"></div>
                    <h5>Done</h5>
                    <div className="total-task-number">{newTaskCount}</div>
                </div>
            </div>
            {taskData
                .filter(task => task.task_status === "Completed")
                .map((task, i) => (
                    <div className="list-item-container" key={i}>
                        <div className="list-item-card">
                            <div className="list-item-banner">
                                <div className="completed-item-badge">Completed</div>
                                <div className="list-item-option" onClick={() => toggleActionList(i)}><HiDotsHorizontal /></div>

                                {showList === i && (
                                    <ul ref={actionListRef} className="completed-list-action">
                                        <li className='task-list-option' style={{ cursor: 'pointer' }} onClick={() => openEditModal(task.task_id)}>Edit</li>
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
                                            <input type="text" placeholder='Heading' value={taskHeading} />
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
                                            <textarea name="" id="" placeholder='Description' value={taskDescription} ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-action-footer">
                                        <button className='action-btn' disabled style={{ color: "white" }}>Deadline</button>
                                        <button className="action-btn" onClick={() => handleEditTask(selectedTask.task_id)} >Assigned to</button>
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

export default CompletedCategory