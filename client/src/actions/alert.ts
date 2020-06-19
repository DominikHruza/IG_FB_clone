import { v4 as uuid } from 'uuid';
import { ActionTypes } from './types';
import { Dispatch } from 'redux';

const { SHOW_ALERT, REMOVE_ALERT } = ActionTypes;

export interface AlertActionPayload {
  msg?: string;
  alertType?: string;
  id: string;
}
export interface AlertAction {
  type: ActionTypes;
  payload: AlertActionPayload;
}

export const setAlert = (msg: string, alertType: string) => (
  dispatch: Dispatch
) => {
  const id: string = uuid();

  dispatch<AlertAction>({
    type: SHOW_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () =>
      dispatch<AlertAction>({
        type: REMOVE_ALERT,
        payload: { id },
      }),
    5000
  );
};
