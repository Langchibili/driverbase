import React, { Component } from 'react';
import Drivers from './Drivers';
import CarOwners from './CarOwners';
import Jobs from './Jobs';
import Strapi from 'strapi-sdk-javascript'
import ContentLoader from '../Includes/ContentLoader';

class List extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      requesting:true
    };
    this.strapi = new Strapi(this.props.api_url);
  }

  getItems = async (reqUrl)=>{
    const itemsName = this.props.itemsName
    const items = await fetch(reqUrl,{
      headers: {
        'Content-Type': 'application/json'
      }
     }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      //meta.pagination
      if(items !== undefined){
        if('data' in items){
          console.log('this is a tester log', items)
          return items.data;
        }
        else if(itemsName === 'users'){
          return items
        }
      }
      
      return []
  }
 
 async componentDidMount(){
    let items
    if(this.props.items && this.props.itemsName === 'users'){
        items = this.props.items
    }
    else{
      if(this.props.itemsName === 'users'){
        const users = await this.getItems(this.props.api_url+this.props.reqUrlPath) // get initial items  
        const listType = this.props.listType === 'drivers'? 'driver': this.props.listType
        items = users.filter((user)=>(user.profile_completion_percentage > 9 && user.type === listType))
      }
      else{
        items = await this.getItems(this.props.api_url+this.props.reqUrlPath) // get initial items  
      } 
    }
    this.setState({requesting: false, items:items},()=>{
      console.log(this.state.items)
    })
    // if(items.length > 0){// if items are not found or zero
    //   this.setState({requesting: false, items:items},()=>{
    //     console.log(this.state.items)
    //   })
    // }
  }
  
  renderList = ()=> {
    const listType = this.props.listType
    if(this.props.itemsName === 'users'){
      if(listType === 'drivers') return <Drivers drivers={this.state.items} {...this.props} />
        if(listType === 'car-owners') return <CarOwners carOwners={this.state.items} {...this.props} />     
    }
    else if(this.props.itemsName === 'jobs'){
        if(listType === 'jobs') return <Jobs jobs={this.state.items} {...this.props} />
    }
    return <></>
  }

  render() {
    return (
     <div className="card">
      <div className="card-header  border-0 pb-0">
        <h4 className="card-title">{this.props.listTitle}</h4>
      </div>
      <div className="card-body"> 
          {this.state.requesting? <ContentLoader/> : this.renderList()}
      </div>
    </div>)
  }
}

export default List;

