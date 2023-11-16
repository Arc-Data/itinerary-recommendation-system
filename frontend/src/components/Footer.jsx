import React from 'react'

export default function Footer() {
    return (
        <footer className='footer'>
          <div className="footer--content">
            <img className='footer--logo' src="/images/logo.png" />
            <p className='footer--text'>© 2023 CebuRoute. All rights reserved.</p>
            <ol className="icons">
              <li><img src="../images/instagram.png"  className="instagram" /></li>
              <li><img src="../images/facebook.png"  className="facebook" /></li>
              <li><img src="../images/twitter-sign.png"  className="twitter" /></li>
            </ol>
          </div>
        </footer>
    )
}