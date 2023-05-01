import React from "react";
import './App.css';
import Maintable from "./Components/Maintable";

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          orders: [],
          items: [

          ]
      }
      this.addToOrder = this.addToOrder.bind(this)
  }

  render() {
      return (
          <div className="App">
              <Maintable onAdd ={this.addToOrder}/>
          </div>
      );
  }

  addToOrder(item) {
      this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;
