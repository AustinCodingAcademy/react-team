import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ApiService from '../../service/ApiService'

const api = new ApiService('appointments')
const TABLE = api.getTable()

class AppointmentComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      petId: this.props.match.params.petId,
      date: this.props.match.params.date,
      type: this.props.match.params.type,
      reason: this.props.match.params.reason
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
      return
    }

    api.retrieve(this.state.id).then(response =>
      this.setState({
        petId: response.data.petId,
        date: response.data.date,
        type: response.data.type,
        reason: response.data.reason
      })
    )
  }

  // TODO: validate petId exists localhost:8080/api/pets
  validate(values) {
    const errors = {}
    errors.petId = values.petId ? '' : 'Cannot be blank'
    errors.date = values.date ? '' : 'Cannot be blank'
    errors.type = values.type ? '' : 'Cannot be blank'
    errors.reason = values.reason ? '' : 'Cannot be blank'
    return errors
  }

  onSubmit(values) {
    const tablename = `/${TABLE}`

    const appointment = {
      id: this.state.id,
      petId: values.petId,
      date: values.date,
      type: values.type,
      reason: values.reason
    }

    if (this.state.id === -1) {
      api.create(TABLE, appointment).then(() => this.props.history.push(tablename))
    } else {
      api.update(TABLE, this.state.id, appointment).then(() => this.props.history.push(tablename))
    }
    console.log(values)
  }

  render() {
    const { id, petId, date, type, reason } = this.state

    return (
      <div className="container">
        <Formik
          initialValues={{
            id,
            petId,
            date,
            type,
            reason
          }}
          onSubmit={this.onSubmit}
          validateOnChange
          validateOnBlur={false}
          validate={this.validate}
          enableReinitialize
        >
          {props => (
            <Form>
              {/* https://reactjs.org/docs/forms.html */}
              <br />
              {/* hide input when id is -1 */
              id > 0 && (
                <fieldset className="form-group">
                  <label>Id</label>
                  <Field className="form-control" type="text" name="id" disabled />
                </fieldset>
              ) /****************************/}
              <fieldset className="form-group">
                <label>Pet ID</label>
                <Field className="form-control" type="text" name="petId" />
                <ErrorMessage name="petId" component="div" className="form-validation" />
              </fieldset>
              <fieldset className="form-group">
                <label>Date</label>
                <Field className="form-control" type="text" name="date" />
                <ErrorMessage name="date" component="div" className="form-validation" />
              </fieldset>
              <fieldset className="form-group">
                {/* TODO: make this a select input:
                  walk-in, web reservation, phone, etc */}
                <label>Type</label>
                <Field className="form-control" type="text" name="type" />
                <ErrorMessage name="type" component="div" className="form-validation" />
              </fieldset>

              <fieldset className="form-group">
                {/* TODO: make this a select input:
                 checkup, shots, sick, etc */}
                <label>Reason</label>
                <Field className="form-control" type="text" name="reason" />
                <ErrorMessage name="reason" component="div" className="form-validation" />
              </fieldset>
              <button className="col btn-primary btn btn-sm" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default AppointmentComponent
