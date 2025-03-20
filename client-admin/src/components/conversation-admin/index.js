// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
/** @jsx jsx */

import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box, jsx } from 'theme-ui'
import { populateZidMetadataStore, resetMetadataStore } from '../../actions'
import { Route, Link, Routes } from 'react-router-dom'

import { withRouter } from '../../withRouter'

import ConversationConfig from './conversation-config'
import ConversationStats from './stats'

import ModerateComments from './comment-moderation/'

// import DataExport from "./data-export";
import ShareAndEmbed from './share-and-embed'

import Reports from './report/reports'

@connect((state) => state.zid_metadata)
class ConversationAdminContainer extends React.Component {
  loadZidMetadata() {
    const { conversation_id } = this.props.router.params;
    this.props.dispatch(
      populateZidMetadataStore(conversation_id)
    )
  }

  resetMetadata() {
    this.props.dispatch(resetMetadataStore())
  }

  componentWillMount() {
    this.loadZidMetadata()
  }

  componentWillUnmount() {
    this.resetMetadata()
  }

  componentDidUpdate() {
    this.loadZidMetadata()
  }

  render() {
    const { location, params } = this.props.router;
    let baseUrl = `/conversation/${params.conversation_id}`;
    const urlSegment = location.pathname.split('/')[3] || '';

    return (
      <Flex>
        <Box sx={{ mr: [5], p: [4], flex: '0 0 275' }}>
          <Box sx={{ mb: [3] }}>
            <Link sx={{ variant: 'links.nav' }} to={`/`}>
              All
            </Link>
          </Box>
          <Box sx={{ mb: [3] }}>
            <Link
              sx={{ variant: !urlSegment ? 'links.activeNav' : 'links.nav' }}
              to={`${baseUrl}`}>
              Configure
            </Link>
          </Box>
          <Box sx={{ mb: [3] }}>
            <Link
              sx={{
                variant: urlSegment === 'share' ? 'links.activeNav' : 'links.nav'
              }}
              to={`${baseUrl}/share`}>
              Distribute
            </Link>
          </Box>
          <Box sx={{ mb: [3] }}>
            <Link
              sx={{
                variant: urlSegment === 'comments' ? 'links.activeNav' : 'links.nav'
              }}
              to={`${baseUrl}/comments`}>
              Moderate
            </Link>
          </Box>
          <Box sx={{ mb: [3] }}>
            <Link
              sx={{
                variant: urlSegment === 'stats' ? 'links.activeNav' : 'links.nav'
              }}
              to={`${baseUrl}/stats`}>
              Monitor
            </Link>
          </Box>
          <Box sx={{ mb: [3] }}>
            <Link
              sx={{
                variant: urlSegment === 'reports' ? 'links.activeNav' : 'links.nav'
              }}
              to={`${baseUrl}/reports`}>
              Report
            </Link>
          </Box>
        </Box>
        <Box sx={{ p: [4], flex: '0 0 auto', maxWidth: '35em', mx: [4] }}>
          <Routes>
            <Route path={`${baseUrl}/`} element={<ConversationConfig />} />
            <Route path={`${baseUrl}/share`} element={<ShareAndEmbed />} />
            <Route path={`${baseUrl}/reports`} element={<Reports />} />
            <Route path={`${baseUrl}/comments`} element={<ModerateComments />} />
            <Route path={`${baseUrl}/stats`} element={<ConversationStats />} />
          </Routes>
        </Box>
      </Flex>
    )
  }
}

export default withRouter(ConversationAdminContainer)
