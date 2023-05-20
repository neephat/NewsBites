import React, { Component} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    let pageSize = 45;
    this.apiKey = process.env.REACT_APP_NEWS_API;
    return (
      <>
      <BrowserRouter>
        <Navbar navTitle="NewsBites" home="Home" categoryDrop="Categories"/>
        <LoadingBar
        height={2}
        color='#f11946'
        progress={this.state.progress}
        />
        <Routes>
           <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={pageSize} category="general" country="in"/>} />
           <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={pageSize} category="business" country="in"/>} />
           <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={pageSize} category="health" country="in"/>}  />
           <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={pageSize} category="science" country="in"/>}  />
           <Route exact path="/sports"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={pageSize} category="sports" country="in"/>}  />
           <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={pageSize} category="entertainment" country="in"/>}  />
           <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={pageSize} category="technology" country="in"/>}  />
        </Routes>
      </BrowserRouter>
      
      </>
    )
  }
}
