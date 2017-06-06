import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Group from './Group';
import { fetchGroups } from '../actions';
import Pagination from './Pagination';

class Groups extends Component {
  componentWillMount() {
    this.props.fetchGroups(this.buildQuery(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search)
      this.props.fetchGroups(this.buildQuery(nextProps));
  }

  buildQuery(props) {
    const { page } = queryString.parse(props.location.search);
    const query = { page };

    return `?${queryString.stringify(query)}`;
  }

  renderPagination() {
    const { total_pages, page, location } = this.props;
    if (total_pages) {
      return <Pagination
        page={page}
        totalPages={total_pages}
        currentSearch={location.search} />
    }
  }

  render() {
    const { groups, currentRole } = this.props;
    const linkToDashboard = currentRole === 'national_organizer';

    return (
      <div>
        <table className='table table--fixed'>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Location</th>
              <th>Tags</th>
              <th>Owner</th>
            </tr>
          </thead>

          <tbody>
            {groups.map(group => <Group key={group.id} group={group} linkToDashboard={linkToDashboard} />)}
          </tbody>
        </table>
        <br />
        {this.renderPagination()}
      </div>

    );
  }
}

const mapStateToProps = (props) => {
  const { groups, total_pages, page } = props.groups;
  const { currentRole } = props;

  return { groups, total_pages, page, currentRole };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);
