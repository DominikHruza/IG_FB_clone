import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { AlertActionPayload } from '../../actions/alert';
import './AlertBox_style.scss';
export interface AlertBoxProps {
  alerts?: AlertActionPayload[];
}

const AlertBox = ({ alerts }: AlertBoxProps): JSX.Element | any =>
  (alerts &&
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))) ||
  null;
const mapStateToProps = (state: StoreState): AlertBoxProps => {
  const { alerts } = state;
  return { alerts };
};

export default connect(mapStateToProps)(AlertBox);
