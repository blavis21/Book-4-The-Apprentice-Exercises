import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from '../modules/AnimalManager'
import EmployeeManager from '../modules/EmployeeManager'
import LocationManager from '../modules/LocationManager'
import OwnerManager from '../modules/OwnerManager'
import AnimalDetail from './animal/AnimalDetail'
import {withRouter} from 'react-router-dom'


class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }

    componentDidMount() {
        const newState = {}

        // fetch("http://localhost:5002/animals")
        //     .then(r => r.json())
        //     .then(animal => newState.animals = animal)
        // .then(() => fetch("http://localhost:5002/employees")
        //     .then(r => r.json()))
        // .then(employee => newState.employees = employee)
        // .then(() => fetch("http://localhost:5002/locations"))
        // .then(r => r.json())
        // .then(location => newState.locations = location)
        // .then(() => fetch("http://localhost:5002/owners"))
        // .then(r => r.json())
        // .then(owner => newState.owners = owner)
        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
        OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
            .then(() => this.setState(newState))
    }



    deleteAnimal = id => AnimalManager.delete(id)
    .then(AnimalManager.getAll)
    .then(animals => {
        this.props.history.push("/animals")
        this.setState({ animals: animals })
    })

    // THIS IS WHAT IT LOOKED LIKE BEFORE
    // {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(e => e.json())
    //         .then(() => fetch(`http://localhost:5002/animals`))
    //         .then(e => e.json())
    //         .then(animals => this.setState({
    //             animals: animals
    //         })
    //         )
    // }

    deleteEmployee = id => 
    EmployeeManager.delete(id)
    .then(EmployeeManager.getAll)
    .then(employee => {
        this.props.history.push("/employees")
        this.setState({ employees: employee })
    })
    // {
    //     return fetch(`http://localhost:5002/employees/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(e => e.json())
    //         .then(() => fetch(`http://localhost:5002/employees`))
    //         .then(e => e.json())
    //         .then(employee => this.setState({
    //             employees: employee
    //         })
    //         )
    // }

    deleteOwner = id => 
    OwnerManager.delete(id)
    .then(OwnerManager.getAll)
    .then(owner => {
        this.props.history.push("owners")
        this.setState({ owners: owner })
    })
    // {
    //     return fetch(`http://localhost:5002/owners/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(e => e.json())
    //         .then(() => fetch(`http://localhost:5002/owners`))
    //         .then(e => e.json())
    //         .then(owner => this.setState({
    //             owners: owner
    //         })
    //         )
    // }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {let animal = this.state.animals.find(animal =>
                        animal.id === parseInt(props.match.params.animalId)
                    )
                    if (!animal) {
                        animal = { id: 404, name: "404", breed: "Dog not found" }
                    }

                    return <AnimalDetail animal={animal}
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList deleteEmployee={this.deleteEmployee}
                        employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList deleteOwner={this.deleteOwner}
                        owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)