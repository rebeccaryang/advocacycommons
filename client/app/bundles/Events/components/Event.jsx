import React, { PropTypes } from 'react';

export default class Event extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {...props};
  }

  render() {
    return (
    <tr>
      <td><a href="" data-toggle="modal" data-target="#event_add-modal">{this.state.title}</a></td>
      <td>{this.state.organizer.name}</td>
      <td>{this.state.start_date}</td>
      <td>{this.state.status}</td>
      <td>{this.state.invited_count}</td>
      <td>{this.state.rsvp_count}</td>
      <td>{this.state.attended_count}</td>
      <td><a href="" className="event_list-toggle"> <i className="fa fa-users"></i> View Participants</a></td>
    </tr>
    );
  }
}
