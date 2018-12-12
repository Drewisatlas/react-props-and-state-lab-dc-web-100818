import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    console.log("changing filter");
    this.setState({
      filters: {type: event.target.value} // this comes from the drop down menu
    })
  }

  fetchPets = () => {
    let query = this.state.filters.type
    if (query === 'all') {
      fetch('/api/pets')
        .then(res => res.json())
        .then(data => this.setState({pets: data}));
    } else {
      fetch(`/api/pets?type=${query}`)
        .then(res => res.json())
        .then(data => this.setState({pets: data})); //HOW DO WE GET THIS DATA
    }
  }

  onAdoptPet = (pet) => {
    let newPetsArr = [...this.state.pets] //mnakes a copy of our existing array
    let adoptedPet = newPetsArr.find(p => p.id === pet.id)
    adoptedPet.isAdopted = true;
    this.setState({pets: newPetsArr});
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} fetchPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
