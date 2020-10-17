import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: "", filteredUserList: "" };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        this.setState({ userList: json, filteredUserList: json })
      );
  }

  handleChange = (e) => {
    if (this.state.userList)
      this.setState({
        filteredUserList: this.state.userList.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Monsters Rolodex</h1>
          <SearchBar handleChange={this.handleChange} />
          <CardList userList={this.state.filteredUserList} />
        </div>
      </div>
    );
  }
}

const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="search monsters..."
        onChange={props.handleChange}
      />
    </div>
  );
};

const CardList = ({ userList }) => {
  let cards = "";
  if (userList)
    cards = userList.map((user) => <Card {...user} key={user.id} />);
  return <div className="cardGrid">{cards} </div>;
};

const Card = ({ name, email }) => {
  return (
    <div className="card">
      <img
        alt="monster avatar"
        src={`https://robohash.org/${name}.png?size=180x180&set=set2`}
      />
      <div className="name">
        <strong>{name}</strong>
      </div>
      <div className="email">{email}</div>
    </div>
  );
};

export default App;
