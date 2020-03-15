import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Authorized from './Authorized';
import Unauthorized from './Unauthorized';


class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async fetchAccount() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async checkAuthorization() {
    const authorizedAccounts = [
      '0x10e7722c5CBF5A3e928457759ABb565BFbCFA70A',
      '0xF5704E4C459D80c961E8d1fdAcb2921f92fde91E',
      '0xcFc0594Ba9bbe99387BD54Bf157Fb3dDC2a8A91b',
      '0x39eaEb9f26f2c56E611336c49fa6593Dc9951457',
      '0x0774a70F1Ce2Ba182b41F90A9123121d93F338E9'
    ]
    const authorized = authorizedAccounts.includes(this.state.account)
    this.setState({ authorized }) // { authorized: authorized}
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false
    }
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Authorized account={this.state.account} />

    } else {
      body = <Unauthorized account={this.state.account} />

    }

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
               {body}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
