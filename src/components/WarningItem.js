import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
  Icon
} from "carbon-components-react";

class StructuredListInputNew extends StructuredListInput {
  constructor(props) {
    super(props);
  }
  render() {
    return <StructuredListInput />;
  }
}

const WarningItem = ({ onChange, tag1, tag2, diff, pos }) => (
  <StructuredListRow label htmlFor="warning" onClick={onChange}>
    <StructuredListInput
      id="warning"
      value="warning"
      title="warning"
      name="warning"
    />
    <StructuredListCell>
      <Icon
        className="bx--structured-list-svg"
        name="checkmark--glyph"
        description="select a warning"
      />
    </StructuredListCell>
    <StructuredListCell>{tag1}</StructuredListCell>
    <StructuredListCell>{tag2}</StructuredListCell>
    <StructuredListCell>{diff}</StructuredListCell>
    <StructuredListCell>{pos}</StructuredListCell>
  </StructuredListRow>
);

WarningItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  tag1: PropTypes.string.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  diff: PropTypes.number.isRequired,
  pos: PropTypes.number.isRequired
};

export default WarningItem;
