import React from "react";
import PropTypes from "prop-types";
import {
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
  Icon
} from "carbon-components-react";

const WarningItem = ({ onClick, tag1, tag2, diff, pos }) => (
  <StructuredListRow label htmlFor="warning" onClick={onClick}>
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
        description="Check off a warning once fixed"
      />
    </StructuredListCell>
    <StructuredListCell>{tag1}</StructuredListCell>
    <StructuredListCell>{tag2}</StructuredListCell>
    <StructuredListCell>{diff}</StructuredListCell>
    <StructuredListCell>{pos}</StructuredListCell>
  </StructuredListRow>
);

WarningItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  diff: PropTypes.number.isRequired,
  pos: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default WarningItem;
