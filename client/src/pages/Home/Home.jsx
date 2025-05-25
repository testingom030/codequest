import React, { useState } from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Rightsidebar from '../../Comnponent/Rightsidebar/Rightsidebar'
import Homemainbar from '../../Comnponent/Homemainbar/homemainbar'
import PostsSection from '../../Comnponent/Posts/PostsSection'
import { useLanguage } from '../../utils/LanguageContext'
import '../../App.css'
import './Home.css'

const Home = ({slidein}) => {
  const [activeTab, setActiveTab] = useState('questions');
  const { translate } = useLanguage();

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2">
        <div className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            {translate('Questions')}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            {translate('Community Posts')}
          </button>
        </div>

        {activeTab === 'questions' ? (
          <>
            <Homemainbar/>
            <Rightsidebar/>
          </>
        ) : (
          <PostsSection />
        )}
      </div>
    </div>
  )
}

export default Home