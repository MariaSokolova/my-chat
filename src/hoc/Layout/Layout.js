import React, {Component} from "react";
import  "./Layout.css"

class Layout extends Component{
  render() {
    return (
      <div className='layout'>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout
