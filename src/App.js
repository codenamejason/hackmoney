import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/app/Navbar'
import Home from './components/app/Home'
import MyComponent from './components/app/MyComponent'
import { loadWeb3 } from './components/interactions'

class App extends Component {
//   componentWillMount() {
//     this.loadBlockchainData(this.props.dispatch)
//   }

  async loadBlockchainData() {
    const web3 = await loadWeb3()
  }

  render() {
    const {
      account,
    } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <Navbar {...this.props} />
          <div id="content">
            <Switch>
              <Route
                path='/my-component'
                render={(props) => (
                  <MyComponent account={account} /> : null
                )}
              />
              <Route
                path='/'
                render={(props) => (
                  <Home {...props} /> : null
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;