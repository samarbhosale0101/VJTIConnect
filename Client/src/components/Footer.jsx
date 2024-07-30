import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (

      <footer>
        <ul className='footer__categories'>
            <li><Link to='/posts/categories/Event'>Event</Link></li>
            <li><Link to='/posts/categories/Workshop'>Workshop</Link></li>
            <li><Link to='/posts/categories/Recruitment'>Recruitment</Link></li>
            <li><Link to='/posts/categories/Academic'>Academic</Link></li>
            <li><Link to='/posts/categories/Competitions'>Competitions</Link></li>
        </ul>
        <div className='footer__copyright'>
            <small>All Rights Reserved &copy; Copyright, Samar</small>
        </div>
      </footer>

  )
}

export default Footer
