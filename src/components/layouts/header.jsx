import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import { LayoutImages } from '../images'

const Header = () => {
      
    return(
        <>  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{background:"#22282A"}}>
          <div>
  <a className="navbar-brand mx-5"><span style={{fontSize:'35px',color:'white'}}>BAKERYS</span></a>
  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav ml-auto">
    <IconButton aria-label="search" color="inherit" width="100px">
                    <img src={LayoutImages.ProfileIcon} alt="profile" width="20px" /> <span style={{fontSize:'15px',padding:'8px',color:'white'}}>My Profile</span>
    </IconButton>
    <IconButton aria-label="display more actions" edge="end" color="inherit">
                <img src={LayoutImages.LogoutIcon} alt="logout"  width="25px"/> <span style={{fontSize:'15px',padding:'8px',color:'white'}}>Logout</span>
      </IconButton>
    </div>
  </div>
</nav>
        </>
    )
}
export default Header
