import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { openLogin } from '../Login.action'
import { showQRCode, hideQRCode } from './LoginEdge.mobileState.js'

import Desktop from './NewAccount.web.js'
import Mobile from './NewAccount.mobile.js'

class NewAccount extends Component {
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  handleOpenLoginWithPasswordPage = () => {
    return this.props.dispatch(openLogin())
  }
  toggleQRCode = () => {
    if (!this.props.view) {
      this.props.dispatch(showQRCode())
    }
    if (this.props.view) {
      this.props.dispatch(hideQRCode())
    }
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            goToSignupPage={this.goToSignupPage}
            handleOpenLoginWithPasswordPage={this.handleOpenLoginWithPasswordPage}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            view={this.props.view}
            edgeId={this.props.edgeId}
            edgeUsername={this.props.edgeUsername}
            edgeAccount={this.props.edgeAccount}
            edgeObject={this.porps.edgeObject}
            goToSignupPage={this.goToSignupPage}
            handleOpenLoginWithPasswordPage={this.handleOpenLoginWithPasswordPage}
            toggleQRCode={this.toggleQRCode}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  view: state.login.mobileShowQRCode,
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults
}))(NewAccount)
