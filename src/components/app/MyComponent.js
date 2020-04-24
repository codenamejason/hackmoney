import React, { Component } from 'react';

class MyComponent extends Component {

//   async componentWillMount() {
//     const { dispatch } = this.props
//     await this.loadBlockchainData(dispatch)
//   }

  async loadBlockchainData() {
    // TODO: Wire up blockchain connection


  }

  render() {
    return(
      <div>
        <h1>My Component</h1>
        <hr/>
      </div>
    )
  }
}


export default MyComponent;