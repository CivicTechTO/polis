import * as types from "../actions";

const zid = (state = {
  loading: false,
  zid_metadata: {},
  error: null
}, action) => {
  switch (action.type) {
  case types.REQUEST_ZID_METADATA:
    return Object.assign({}, state, {
      conversation_id: action.data.conversation_id,
      loading: true,
      error: null
    });
  case types.RECEIVE_ZID_METADATA:
    return Object.assign({}, state, {
      loading: false,
      zid_metadata: action.data,
      error: null
    });
  case types.ZID_METADATA_RESET:
    return Object.assign({}, state, {
      loading: false,
      zid_metadata: {},
      error: null
    });
  case types.UPDATE_ZID_METADATA_STARTED:
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  case types.UPDATE_ZID_METADATA_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      zid_metadata: action.data,
      error: null
    });
  case types.UPDATE_ZID_METADATA_ERROR:
    return Object.assign({}, state, {
      loading: false,
      error: action.data
    });
  default:
    return state;
  }
};

export default zid;
