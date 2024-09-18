import React, { useState } from 'react'

import '../Styles/SearchSection.css'
import { Select } from 'antd';
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaChartGantt } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

const SearchSection = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='action-container'>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="sidebar-close-btn" onClick={toggleSidebar}><IoClose /></button>
                <div className="sidebar-content">
                    <div className="sidebar-option-wrapper">
                        <div className="option-icon-cont"><FaChartGantt /></div>
                        <div className="option-name-cont">
                            <span>Gantt Chart</span>
                        </div>
                    </div>

                    <div className="sidebar-option-wrapper">
                        <div className="option-icon-cont"><FaRegUserCircle /></div>
                        <div className="option-name-cont">
                            <span>User Management</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="search-input-wrapper">
                <div className='sidebar-cntrl-btn' onClick={toggleSidebar}>
                    <FaBars />
                </div>
                <div class="searchbar">
                    <div class="searchbar-wrapper">
                        <div class="searchbar-left">
                            <div class="search-icon-wrapper">
                                <span class="search-icon searchbar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div class="searchbar-center">
                            <div class="searchbar-input-spacer"></div>

                            <input type="text" class="searchbar-input" placeholder="Search..." />
                        </div>
                    </div>
                </div>
            </div>

            <div className="filter-wrapper">
                <select>
                    <option value="1" disabled selected>Filter</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
        </div>
    )
}

export default SearchSection