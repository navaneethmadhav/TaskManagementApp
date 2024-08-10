import React from 'react'
import '../Styles/MainSection.css'
import expiredIcon from '../Assets/Icons/Expired.svg'
import activeIcon from '../Assets/Icons/activeTask.svg'
import completedIcon from '../Assets/Icons/clock.svg'

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
            </div>
            <div className="dashboard-list-section">
                <div className="category-container">as</div>
                <div className="category-container">asa</div>
                <div className="category-container">dfdf</div>
            </div>
        </div>
    )
}

export default MainSection