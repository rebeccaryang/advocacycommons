import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { fetchGroup } from '../actions';
import { dashboardPath, groupId, affiliatesPath, groupsPath } from '../utils/Pathnames';

class Breadcrumbs extends Component {
  componentWillMount() {
    const { currentGroup } = this.props;
    const id = groupId();

    if (currentGroup.id != id)
      this.props.fetchGroup(id);
  }

  renderAffiliatesBreadcrumb() {
    const { currentGroup } = this.props;

    if (currentGroup.id == groupId())
      return false;

    return (
      <li className='breadcrumb-item'>
        <Link to={affiliatesPath(currentGroup.id)}>All Groups</Link>
      </li>
    );
  }

  renderTagBreadcrumb() {
    const { tag } = queryString.parse(this.props.location.search);

    if (tag)
      return (
        <li className='breadcrumb-item active'>
          {tag}
        </li>
      );
  }

  renderActiveBreadcrumb() {
    const { active, location } = this.props;
    const { tag } = queryString.parse(location.search);

    if (!tag)
      return <li className='breadcrumb-item active'>{active}</li>


    return (
      <li className='breadcrumb-item'>
        <Link to={location.pathname}>{active}</Link>
      </li>
    );
  }

  renderCurrentAffiliateBreadcrumb() {
    const { currentGroup, group } = this.props;

    if (currentGroup.id == groupId() || !group.attributes)
      return false;

    return (
      <li className='breadcrumb-item'>
        <Link to={groupsPath()}>{group.attributes.name}</Link>
      </li>
    );
  }

  render() {
    const { currentRole, currentGroup, active } = this.props;

    if (currentRole != 'national_organizer')
      return false;

    return (
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to={dashboardPath(currentGroup.id)}>{currentGroup.name}</Link>
        </li>

        {this.renderAffiliatesBreadcrumb()}

        {this.renderCurrentAffiliateBreadcrumb()}

        {this.renderActiveBreadcrumb()}

        {this.renderTagBreadcrumb()}
      </ol>
    );
  }
}

const mapStateToProps = ({ currentGroup, currentRole, group }) => {
  return { currentGroup, currentRole, group };
};

export default connect(mapStateToProps, { fetchGroup })(Breadcrumbs);
