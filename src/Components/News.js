import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  //   articles = [get the articles from the sampleOutput.json file]

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    //without super() if we define constructor then it will throw error. constructor is called when an obj of this class is created
    super(props);
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  // async componentDidMount() {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12430f46e175432abfc13b84447169eb&page=1&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults })
  // }

  // handleNextClick = async () => {
  //   console.log("Next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12430f46e175432abfc13b84447169eb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true })
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     console.log(parsedData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       totalArticles: parsedData.totalResults,
  //       loading: false
  //     })
  //   }
  // }

  // handlePrevClick = async () => {
  //   console.log("Previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12430f46e175432abfc13b84447169eb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }

  // refracting the above commented code
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults
      // ,
      // loading: false,
    })
  };

  render() {
    return (
      // removing the div bcz we need to remove thescrolling from the app
      <div className="container my-3">
        {/* <> */}
        <h2 className='text-center' style={{ margin: "35px 0pxs" }}>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />} >
          <div className="container my-3">
            <div className='row'>
              {/* below line is used to add infinte scroll in the app */}
              {this.state.articles.map((ele, index) => {
                return <div className="col-md-4" key={index}>
                  <NewsItem title={ele.title ? ele.title.slice(0, 24) : ""} description={ele.description ? ele.description.slice(0, 88) : ""}
                    imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* added the commented line to add loading through spinner component and using next and prev button
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((ele => {
            return <div className="col-md-4" key={ele.url}>
              <NewsItem title={ele.title ? ele.title.slice(0, 24) : ""} description={ele.description ? ele.description.slice(0, 88) : ""}
                imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
            </div>
          }))}
        </div>

        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles /this.props.pageSize )} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
      //  </>
    )
  }
}

export default News
