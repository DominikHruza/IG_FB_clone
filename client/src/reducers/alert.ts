import { ActionTypes } from '../actions/types';
import { Switch } from 'react-router-dom';
import { AlertAction, AlertActionPayload } from '../actions/alert';

const { SHOW_ALERT, REMOVE_ALERT } = ActionTypes;
const initState: AlertActionPayload[] = [];

export default function (state = initState, action: AlertAction) {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload.id);
    default:
      return state;
  }
}
