import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  constructor(props){
    super(props);
    this.state = {
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0
    }
    document.title = `${ this.capitalizeFirstLetter(this.props.category)} - NewsBites`
  }
  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({ 
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
     })
     this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }
    fetchMoreData = async() => {
      
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({page: this.state.page + 1 })
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({ 
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
     })
    };
    // handlePrev = async()=>{
    // let url = `https://newsapi.org/v2/top-headlines?q=trump&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ 
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    //  })
    // }
    // handleNext = async()=>{
    //     let url = `https://newsapi.org/v2/top-headlines?q=trump&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({ 
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //      })
        
    //     }
  render(props) {
    
    return (
      <div className='container text-center'>
        <h2 style={{marginTop: "80px"}}>NewsBites Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0, 32):"Title is not provided"}
                        description={element.description?element.description.slice(0, 70):"Author doesnot provide any description"} imageUrl={element.urlToImage}
                        newsUrl={element.url} author={element.author?element.author.slice(0,16):"Unknown"} date={element.publishedAt} source={element.source.name}/>
                    </div>
              })}
        </div>
        </div>
        </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-sm btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
        
      </div>
    )
  }
}

export default News