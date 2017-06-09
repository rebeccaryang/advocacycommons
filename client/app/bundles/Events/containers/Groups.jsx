import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroupsList from '../components/Groups';
import Nav from '../components/Nav';
import Breadcrumbs from '../components/Breadcrumbs';

class Groups extends Component {
  render() {
    const { currentGroup } = this.props;

    return (
      <div>
        <Breadcrumbs active='All Groups' location={this.props.location} />

        <br/>

        <Nav activeTab='groups' />

        <GroupsList location={this.props.location} />
      </div>
    );
  }
}

const mapStateToProps = ({ currentGroup }) => {
  return { currentGroup }
};

export default connect(mapStateToProps)(Groups);
