import React, { Component } from 'react'
import NewsItems from './NewsItems'
export class News extends Component {
    articles=[]
  constructor(){
    super();
    this.state ={
       articles:[],
       loading:false,
       page:1
    }
  }
 async  componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a6c429bffb34633bcb49bdcfab0a9fd&page=1&pageSize=20";
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  }
  handleprev=async ()=>{
   
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a6c429bffb34633bcb49bdcfab0a9fd&page=${this.state.page-1}&pageSize=20`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
   this.setState({
    page:this.state.page-1,
    articles:parsedData.articles
   })
  }
  handlenext=async ()=>{
     if(this.state.page+1>Math.ceil(this.state.totalResults/20))
    {

    }
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a6c429bffb34633bcb49bdcfab0a9fd&page=${this.state.page+1}&pageSize=20`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
   this.setState({
    page:this.state.page+1,
    articles:parsedData.articles
   })
  }
}
  render() {
    return (
      <div className="container my-3">
        
        <div className="row">
          {this.state.articles.map((element)=>{
          return <div className="col-md-3"key ={element.url}>
                   <NewsItems  title={element?element.title.slice(0,45):""} description={element.description?element.description.slice(0,75):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
        })}
          
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}> &larr prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handlenext}>next &rarr</button>
        </div>
      </div>
    )
  }
}

export default News
