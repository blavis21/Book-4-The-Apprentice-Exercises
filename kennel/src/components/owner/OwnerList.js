import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
    //         <section className="owners">
    //   {
    //     this.props.owners.map(owner =>
    //         <div className="card" key={owner.id}>
    //             <p className="card-body">{owner.name}</p>
    //             <p className="card-body">{owner.phoneNumber}</p>
    //         </div>
    //     )
    //   }
    //   </section>
    <section className="owners">
        {
          this.props.owners.map(owner =>
            <div key={owner.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>{owner.name}</h5>
                  <button
                    onClick={() => this.props.deleteOwner(owner.id)}
                    className="card-link">Delete</button>
                </div>
              </div>
            </div>
          )
        }
      </section>
        )
    }
}
