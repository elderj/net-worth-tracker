import React from "react";
import { formatMoney } from "../utils";

function TotalsSummary(props) {
  return <div>{formatMoney(props.total)}</div>;
}

export default TotalsSummary;
