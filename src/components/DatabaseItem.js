import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableData } from "carbon-components-react";

const DatabaseItem = ({ name, id, matches }) => (
  <TableRow>
    <TableData className="name">{name}</TableData>
    <TableData className="id">{id}</TableData>
    <TableData className="matches">{matches}</TableData>
  </TableRow>
);

DatabaseItem.PropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired
};

export default DatabaseItem;
