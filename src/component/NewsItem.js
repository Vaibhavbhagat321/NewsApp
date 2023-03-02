import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { imgUrl, title, desc, url, author, publishedAt } = this.props;

    

    return (
      <div className="container">
        <div className="card">
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "180px", width: "330px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} <br />
                on {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
