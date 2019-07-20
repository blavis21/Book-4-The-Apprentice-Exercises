import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'


export default class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }

    componentDidMount() {
        const newState = {}
    
        fetch("http://localhost:5002/animals")
            .then(r => r.json())
            .then(animal => newState.animals = animal)
            .then(() => fetch("http://localhost:5002/employees")
            .then(r => r.json()))
            .then(employee => newState.employees = employee)
            .then(() => fetch("http://localhost:5002/locations"))
            .then(r => r.json())
            .then(location => newState.locations = location)
            .then(() => fetch("http://localhost:5002/owners"))
            .then(r => r.json())
            .then(owner => newState.owners = owner)
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}
