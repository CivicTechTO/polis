// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
/** @jsx jsx */

import ComponentHelpers from '../../../util/component-helpers'

import NoPermission from '../no-permission'
import React from 'react'
import { connect } from 'react-redux'
import { populateAllCommentStores } from '../../../actions'
import { Heading, Flex, Box, jsx } from 'theme-ui'

import ModerateCommentsTodo from './moderate-comments-todo'
import ModerateCommentsAccepted from './moderate-comments-accepted'
import ModerateCommentsRejected from './moderate-comments-rejected'

import { Routes, Route, Link } from 'react-router-dom'
import { withRouter } from '../../../withRouter'

const mapStateToProps = (state, ownProps) => {
  return {
    unmoderated: state.mod_comments_unmoderated,
    accepted: state.mod_comments_accepted,
    rejected: state.mod_comments_rejected,
    seed: state.seed_comments
  }
}

const pollFrequency = 60000

@connect((state) => state.zid_metadata)
@connect(mapStateToProps)
class CommentModeration extends React.Component {
  loadComments() {
    const { conversation_id } = this.props.router.params
    this.props.dispatch(populateAllCommentStores(conversation_id))
  }

  componentWillMount() {
    this.getCommentsRepeatedly = setInterval(() => {
      this.loadComments()
    }, pollFrequency)
  }

  componentDidMount() {
    this.loadComments()
  }

  componentWillUnmount() {
    clearInterval(this.getCommentsRepeatedly)
  }

  render() {
    const { location } = this.props.router
    const urlSegment = location.pathname.split('/')[4] || ''

    if (ComponentHelpers.shouldShowPermissionsError(this.props)) {
      return <NoPermission />
    }

    return (
      <Box>
        <Heading
          as="h3"
          sx={{
            fontSize: [3, null, 4],
            lineHeight: 'body',
            mb: [3, null, 4]
          }}>
          Moderate
        </Heading>
        <Flex sx={{ mb: [4] }}>
          <Link
            sx={{
              mr: [4],
              variant: !urlSegment ? 'links.activeNav' : 'links.nav'
            }}
            to={`${this.props.router.location.pathname.split('/comments')[0]}/comments`}>
            Unmoderated{' '}
            {this.props.unmoderated.unmoderated_comments
              ? this.props.unmoderated.unmoderated_comments.length
              : null}
          </Link>
          <Link
            sx={{
              mr: [4],
              variant: urlSegment === 'accepted' ? 'links.activeNav' : 'links.nav'
            }}
            to={`${this.props.router.location.pathname.split('/comments')[0]}/comments/accepted`}>
            Accepted{' '}
            {this.props.accepted.accepted_comments
              ? this.props.accepted.accepted_comments.length
              : null}
          </Link>
          <Link
            sx={{
              mr: [4],
              variant: urlSegment === 'rejected' ? 'links.activeNav' : 'links.nav'
            }}
            to={`${this.props.router.location.pathname.split('/comments')[0]}/comments/rejected`}>
            Rejected{' '}
            {this.props.rejected.rejected_comments
              ? this.props.rejected.rejected_comments.length
              : null}
          </Link>
        </Flex>
        <Box>
          <Routes>
            <Route
              path={`${this.props.router.location.pathname.split('/comments')[0]}/comments`}
              element={<ModerateCommentsTodo />}
            />
            <Route
              path={`${this.props.router.location.pathname.split('/comments')[0]}/comments/accepted`}
              element={<ModerateCommentsAccepted />}
            />
            <Route
              path={`${this.props.router.location.pathname.split('/comments')[0]}/comments/rejected`}
              element={<ModerateCommentsRejected />}
            />
          </Routes>
        </Box>
      </Box>
    )
  }
}

export default withRouter(CommentModeration)