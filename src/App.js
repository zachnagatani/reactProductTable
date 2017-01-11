import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// ProductRow - row with a single product's information
class ProductRow extends Component {
  // Returns a list-item with product name and price
  render() {
    return <li><span>{this.props.name}</span><span className="float-right">{this.props.price}</span></li>
  }
}

// ProductCategorySection - actual sections based on category that hold the products, 
class ProductCategorySection extends Component {
  // Returns a section based on the category passed to it in props
  render() {
    // Filters the product list based on category and user input via search bar
    let filteredListItems = this.props.products.filter((product) =>
      product.category === this.props.category && product.name.toLowerCase().includes(this.props.filterText.toLowerCase())
    );

    // Additional filtering if inStockOnly is true to remove products that aren't in stock
    if (this.props.inStockOnly) {
      filteredListItems = filteredListItems.filter((product) =>
        product.stocked === true
      );
    }

    // Creates an array of ProductRows (li's) to be appended to the ul in the render output
    const listItems = filteredListItems.map((product) =>
      <ProductRow key={product.name} name={product.name} price={product.price} />
    );

    return(
      <div className="product-category-section">
        <h3 className="category-header">{this.props.category}</h3>
        <ul className="product-list">{listItems}</ul>
      </div>
    );
  }
}

// ProductTable - the actual table that holds the product category sections,
class ProductTable extends Component {
  // Returns div that holds all of the category sections
  // Passes in the filterText, inStockOnly values, category, and products
  render() {
    return (
      <div className="product-table">
        <h2><span>Name</span><span className="float-right">Price</span></h2>
        <ProductCategorySection products={this.props.products} category="Sporting Goods" filterText={this.props.filterText} inStockOnly={this.props.inStockOnly}/>
        <ProductCategorySection products={this.props.products} category="Electronics" filterText={this.props.filterText} inStockOnly={this.props.inStockOnly}/>
      </div>
    );
  }
}

// SearchBar - for user to filter the table,
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Event handler that calls the event handler passed from parent component
  // Handles input on the search bar
  handleInput(e) {
    this.props.handleInput(e.target.value);
  }

  // Calls event handler from parent
  // Handles clicks on the checkbox
  handleClick () {
    this.props.handleClick();
  }

  // Renders a form, setting the value of the text input to the filterText received from parent state via props
  // Sets checked in the checkbox according to the inStockOnly value received from parent state via props
  render() {
    return (
      <form className="searchbar">
        <label>
          Search for Products
          <input type="text" value={this.props.filterText} onChange={this.handleInput} />
        </label><br />
        <br />  
        <label>
          <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleClick}/> Only show products in stock
        </label>
      </form>
    );
  }
}

// FilterableProductTable - the whole table
class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    
    // State initialization:
    // filterText is set to an empty string (makes sure input is empty at start)
    // inStockOnly is defaulted to false
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Sets the state according to the value of the searchbar input
  handleInput(value) {
    this.setState(
      {
        filterText: value
      }
    );
  }

  // Sets the state of inStockOnly according to the checkbox
  handleClick() {
    this.setState(
      {
        inStockOnly: !this.state.inStockOnly
      }
    );
  }

  // Renders the two main components that make up our product chart: the SearchBar and the ProductTable
  // Passes in state properties and event handlers as props to child components
  render() {
    return (
      <div className="filterable-product-table">
        <SearchBar filterText={this.state.filterText} onInput={this.handleInput} handleInput={this.handleInput} inStockOnly={this.state.inStockOnly} handleClick={this.handleClick}/>
        <ProductTable products={this.props.products} inStockOnly={this.state.inStockOnly} filterText={this.state.filterText}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      /*<div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <FilterableProductTable products={this.props.products} />
      </div>
    );
  }
}

export default App;