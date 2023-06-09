import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import { Search } from '@material-ui/icons';
import Link from 'next/link';
//import { SearchOutlined } from '@mui/icons-material';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initial state goes here
    };
  }
  

  loggedInUserProfileIconSrc = ()=>{
    let profileDetails,profile_photo
    if(this.props.loggedInUserProfile.type === 'driver') {
        if(this.props.loggedInUserProfile.profile_completion_percentage <= 5){
          return '/default-profile.png' 
        }
        profileDetails = this.props.loggedInUserProfile.driverProfile.details
    }
    if(this.props.loggedInUserProfile.type === 'car-owner') {
        if(this.props.loggedInUserProfile.profile_completion_percentage <= 5){
          return '/default-profile.png' 
        }
        profileDetails = this.props.loggedInUserProfile.carOwnerProfile.details
    }
    if(profileDetails.profile_thumbnail_image !== null){
        const backEndUrl = this.props.api_url.replace('/api','')
        profile_photo = profileDetails.profile_thumbnail_image.formats? backEndUrl+profileDetails.profile_thumbnail_image.formats.thumbnail.url : '/default-profile.png'    
    }
    else{
        profile_photo = '/default-profile.png' 
    }
    return profile_photo
  }

  renderLoggedInHeaderData = ()=>{
    const loggedInUserProfile = this.props.loggedInUserProfile
    if(loggedInUserProfile === 'logged-out'){
       return <><Link href="/signup" className="btn btn-primary light btn-rounded me-auto">SingUp</Link><Link href="/login" className="btn btn-primary light btn-rounded me-auto">Login</Link></>
    }
    else{
       return (<><a className="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                    <img style={{border:'2px solid lightgrey'}} src={this.loggedInUserProfileIconSrc()} width={20} alt />
                    <div className="header-info">
                      <span className="text-black">{loggedInUserProfile.username}</span>
                      <p className="fs-12 mb-0" style={{textTransform:'capitalize'}}>{loggedInUserProfile.type}</p>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link href={"/profile?user_type="+loggedInUserProfile.type+"&uid="+loggedInUserProfile.id} className="dropdown-item ai-icon">
                      <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                      <span className="ms-2">Profile </span>
                    </Link>
                    <Link href="/profile" className="dropdown-item ai-icon">
                      <svg id="icon-edit" xmlns="http://www.w3.org/2000/svg" className="text-success" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      <span className="ms-2">Edit Profile </span>
                    </Link>
                    <Link href="/logout" className="dropdown-item ai-icon">
                      <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                      <span className="ms-2">Logout </span>
                    </Link>
                  </div>
                </>
       )
    }
  }

  render() {
    return (
        <div className={"header"+this.props.linkClicked? ' mt-1':''}>
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">
                  Dashboard
                </div>
              </div>
              <ul className="navbar-nav header-right">
               
                <li className="nav-item dropdown notification_dropdown">
                <IconButton  color="primary" aria-label="search icon" component="label">
                      <Search />
                </IconButton>
                </li>
                <li className="nav-item dropdown header-profile">
                  {this.renderLoggedInHeaderData()}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
   );
}
}

export default Header;