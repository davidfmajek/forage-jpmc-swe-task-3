import { ServerRespond } from './DataStreamer';

//modified this interface to correspond with the schema of the table
export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number|undefined,
}



export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row 
  {
    const PRICE_ABC = (serverRespond[0].top_ask.price+ serverRespond[0].top_bid.price) /2;
    const PRICE_DEF = (serverRespond[1].top_ask.price+ serverRespond[1].top_bid.price) /2; 
    const ratio = PRICE_ABC / PRICE_DEF;
    const UPPERBOUND = 1 + 0.05;
    const LOWERBOUND = 1 - 0.05;
    return {
      price_abc: PRICE_ABC,
      price_def: PRICE_DEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: UPPERBOUND,
      lower_bound: LOWERBOUND,
      trigger_alert: (ratio > UPPERBOUND || ratio < LOWERBOUND) ? ratio : undefined,
    };
  }
}
