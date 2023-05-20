import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='container my-3 text-center'>
          <div className="card" style={{height: "21rem"}}>
              <img src={!imageUrl?"https://i.insider.com/5db07d2c4af909315229faa2?width=700":imageUrl} className="card-img-top" style={{height: "10rem"}} alt="..."/>
              <div className="card-body">
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  right: "0",
                  position: "absolute",
                  top:"0"
                }}>
                <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
              <h5 className="card-title" style={{fontSize: "15px"}}>{title}</h5>
              <p className="card-text" style={{fontSize:"12px", height:"2rem"}}>{description}</p>
              <small className="text-muted" style={{display: "block", fontSize:"11px", height: "2rem"}}>By <strong>{!author?"Unknown": author}</strong> on {new Date(date).toLocaleString()}</small>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
              </div>
         </div>     
      </div>
    )
  }
}

export default NewsItem
