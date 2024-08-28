import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../Styles/TimeOutCategory.css'

import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const TimeOutCategory = () => {

    const [taskData, setTaskData] = useState([]);
    const [timeoutTaskCount, setTimeoutTaskCount] = useState(0);

    const getTaskData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/get-tasks`);
        // console.log(result);

        const today = new Date();

        const expiredTasks = result.data.tasks.filter(task => {
            const endDate = new Date(task.end_date); // Parse the date
            return endDate < today;
        })

        console.log(expiredTasks);

        setTaskData(expiredTasks);

        // const newTasks = result.data.tasks.filter(task => task.task_status === "On Progress");
        setTimeoutTaskCount(expiredTasks.length);
    }

    useEffect(() => {
        getTaskData()
    }, [])

    return (
        <div className='timeout-parent-container'>
            <div className="timeout-category-header">
                <div className="timeout-header-wrapper">
                    <div className="timeout-category-indicator"></div>
                    <h5>Time Out</h5>
                    <div className="total-task-number">{timeoutTaskCount}</div>
                </div>
            </div>

            {taskData.map((task, i) => (
                <div className="list-item-container" key={i}>
                    <div className="list-item-card">
                        <div className="list-item-banner">
                            {task.task_priority === "Low" ? (
                                <div className="list-item-badge">{task.task_priority}</div>
                            ) : (
                                <div className="priority-item-badge">{task.task_priority}</div>
                            )}
                            <div className="list-item-option"><HiDotsHorizontal /></div>
                        </div>

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

export default TimeOutCategory