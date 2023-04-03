import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }
  

  async updateNews(page) {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(40);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  handlerNextClick = async () => {
    this.updateNews(this.state.page + 1);
    this.setState({
      page: this.state.page + 1,
    });
  };

  handlerPrevClick = async () => {
    this.updateNews(this.state.page - 1);
    this.setState({
      page: this.state.page - 1,
    });
  };

  render() {
    return (
      <div className="container my-3"style={{"paddingTop": "40px"}}>
        <h2 className="text-center my-3">
          Top News -{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          News
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.article.map((element) => {
              const desc = element.description
                ? element.description
                : "This news description is missing. Please click to read more to read full article description.";
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.cnet.com/a/img/resize/fed9e63af2601287457b34ab6ae652b5bf1f2f78/hub/2023/02/02/e4af86ce-961c-4790-917a-8a88bbda3283/potw2045a.jpg?auto=webp&fit=crop&height=630&width=1200"
                    }
                    title={element.title ? element.title.slice(0, 40) : ""}
                    desc={
                      desc
                        ? desc.slice(0, 88)
                        : ""
                    }
                    url={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                  />
                </div>
              );
            })}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              onClick={this.handlerPrevClick}
              className="btn btn-dark btn-sm"
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handlerNextClick}
              className="btn btn-dark btn-sm"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
