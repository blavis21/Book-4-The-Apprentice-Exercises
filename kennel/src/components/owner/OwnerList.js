import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
      {
        this.props.owners.map(owner =>
            <div key={owner.id}>
                <p>{owner.name}</p>
                <p>{owner.phoneNumber}</p>
            </div>
        )
      }
      </section>
        )
    }
}
