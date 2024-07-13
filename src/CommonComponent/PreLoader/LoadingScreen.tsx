import React from 'react'
import './loading.css'
const LoadingScreen = () => {
  return (
    <div className="loading">
      <div className="dot-spinner">
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
      </div>
    </div>
  )
}

export default LoadingScreen
