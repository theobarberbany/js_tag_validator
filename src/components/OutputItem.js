import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableData } from "carbon-components-react";

const proportion = (int, total) => {
  return (int / total * 100).toFixed(2);
};

const OutputItem = ({ colNo, a, t, c, g, sum }) => (
  <TableRow>
    <TableData>{colNo}</TableData>
    <TableData className="a">{proportion(a, sum)}</TableData>
    <TableData className="t">{proportion(t, sum)}</TableData>
    <TableData className="c">{proportion(c, sum)}</TableData>
    <TableData className="g">{proportion(g, sum)}</TableData>
  </TableRow>
);

OutputItem.PropTypes = {
  colNo: PropTypes.number.isRequired,
  a: PropTypes.number.isRequired,
  t: PropTypes.number.isRequired,
  c: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired
};
export default OutputItem;
