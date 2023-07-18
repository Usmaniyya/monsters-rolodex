import { Component } from 'react'
import './App.css'
import SearchBox from './components/search-box/search-box.component'
import CardList from './components/card-list/card-list.component'

class App extends Component {
  constructor() {
    super()
    this.state = {
      monsters: [],
      searchField: '',
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }))
  }

  onSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase()
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    const { monsters, searchField } = this.state
    const { onSearchChange } = this
    // [{name: 'Frankenstein'}, {name: 'Dracula'}, {name: 'Zombie'}}]
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })
    return (
      <div className="App">
        <h1 className="title">Monsters Rolodex</h1>
        <SearchBox
          className="search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App
