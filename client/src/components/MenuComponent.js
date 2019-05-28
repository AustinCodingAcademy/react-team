import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService'
import Icon from './Icon'

class MenuComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    return (
      <div className="container">
        <h1 className="header">Title here</h1>

        {isUserLoggedIn && (
          <ul>
            <li>
              <Link to="/clients">clients</Link>
            </li>
            <li>
              <Link to="/pets">pets</Link>
            </li>
            <li>
              <Link to="/appointments">appointments</Link>
            </li>
          </ul>
        )}

        <ul>
          {isUserLoggedIn && (
            <>
              <span role="button">{AuthenticationService.getLoggedInUserName()}</span>
              <Link to="/profile">
                <Icon type="icon-user-circle-o" textAfter="Profile" />
              </Link>
              <Link to="/settings">
                <Icon type="icon-cog" textAfter="Settings" />
              </Link>
              <Link to="/logout" title="logout" onClick={AuthenticationService.logout}>
                <Icon type="icon-logout" textAfter="Sign out" />
              </Link>
            </>
          )}
        </ul>

        {!isUserLoggedIn && (
          <div>
            <Link to="/login">
              <Icon type="icon-login" textBefore="Login" />
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(MenuComponent)