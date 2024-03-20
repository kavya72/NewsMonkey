import React, { Component } from 'react';


export class NewsItem extends Component {
  render() {

    // newsId is a unique url to identify the particular news
    {/* below line is called destructuring f this.props is an object. 
    then the key value is pulled from an obj */}
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>
          <img src={imageUrl ? imageUrl : "https://c.ndtvimg.com/2024-03/u01ad1d8_spacex_625x300_16_March_24.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738?ver-20240316.08"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{right:"50%", zIndex:'1'}}> {source} </span> */}

            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
