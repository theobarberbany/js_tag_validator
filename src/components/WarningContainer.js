// Display Warnings from validator.js
import React from "react";
import { connect } from "react-redux";
import * as warningContainerActionCreators from "../ducks/warningDuck";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell
} from "carbon-components-react";
import WarningItem from "./WarningItem";

export const WarningContainer = ({ badPairs, badPairsConcat, onClick }) => (
  <div>
    <Accordion
      style={{
        background:
          badPairs.length + badPairsConcat.length === 0
            ? "rgba(92, 167, 0, 0.55)"
            : "rgba(231, 29, 50, 0.55)"
      }}
    >
      <AccordionItem title="Tag Clash">
        <StructuredListWrapper selection border>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>{""}</StructuredListCell>
              <StructuredListCell head>Tag</StructuredListCell>
              <StructuredListCell head>Clashing Tag</StructuredListCell>
              <StructuredListCell head>Difference</StructuredListCell>
              <StructuredListCell head>Position in manifest</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {badPairs.map(badPair => (
              <WarningItem
                key={badPair.id}
                {...badPair}
                onClick={e => {
                  e.preventDefault();
                  onClick(badPair.id);
                }}
              />
            ))}
            {badPairsConcat.map(badPair => (
              <WarningItem
                key={badPair.id}
                {...badPair}
                onClick={e => {
                  e.preventDefault();
                  onClick(badPair.id);
                }}
              />
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </AccordionItem>
    </Accordion>
  </div>
);

WarningContainer.PropTypes = {
  badPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tag1: PropTypes.string.isRequired,
      tag2: PropTypes.string.isRequired,
      diff: PropTypes.number.isRequired,
      pos: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

//Once checked off, remove from list.
export const getVisibleWarnings = badPairs => {
  return badPairs.filter(bp => !bp.completed);
};

export const mapStateToProps = state => {
  return {
    badPairs: getVisibleWarnings(state.warningContainer.warningItems.badPairs),
    badPairsConcat: getVisibleWarnings(
      state.warningContainer.warningItems.badPairsConcat
    )
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onClick: id => {
      console.log("Id passed: ", id);
      dispatch(warningContainerActionCreators.toggleTagPair(id));
    }
  };
};

const WarningContainerExport = connect(mapStateToProps, mapDispatchToProps)(
  WarningContainer
);

export default WarningContainerExport;
