import React, { Component } from 'react'

export default class EmployeeList extends Component {
  render() {
    return (
      // <section className="employees">
      // {
      //   this.props.employees.map(employee =>
      //       <div key={employee.id}>
      //           {employee.name}
      //       </div>
      //   )
      // }
      // </section>
      <section className="employees">

        {
          this.props.employees.map(employee =>
            <div key={employee.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>{employee.name}</h5>
                  <button
                    onClick={() => this.props.deleteEmployee(employee.id)}
                    className="card-link">Fire Employee</button>
                </div>
              </div>
            </div>
          )
        }
      </section>
    )
  }
}
