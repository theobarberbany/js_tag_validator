// Display output from validator.js
import React from "react";
import { connect } from "react-redux";
import * as fileHandlerActionCreators from "../ducks/FileHandlerDuck";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from "carbon-components-react";

import OutputItem from "./OutputItem";

const sum = Array => {
  Array.reduce((acc, cur) => acc + cur, 0);
};

const OutputContainer = composition => (
  <Accordion>
    <AccordionItem title="Tag 1">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Column </TableHeader>
            <TableHeader> A </TableHeader>
            <TableHeader> T </TableHeader>
            <TableHeader> C </TableHeader>
            <TableHeader> G </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {composition.composition[0].map((tag, index) => (
            <OutputItem
              key={index}
              colNo={index}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={tag.reduce((prev, curr) => prev + curr)}
            />
          ))}
        </TableBody>
      </Table>
    </AccordionItem>
    <AccordionItem title="Tag 2">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Column </TableHeader>
            <TableHeader> A </TableHeader>
            <TableHeader> T </TableHeader>
            <TableHeader> C </TableHeader>
            <TableHeader> G </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {composition.composition[1].map((tag, index) => (
            <OutputItem
              key={index}
              colNo={index}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={tag.reduce((prev, curr) => prev + curr)}
            />
          ))}
        </TableBody>
      </Table>
    </AccordionItem>
  </Accordion>
);

OutputContainer.PropTypes = {
  composition: PropTypes.shape({
    composition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  })
};

const mapStateToProps = state => {
  return {
    composition: state.fileHandler.overview.composition
  };
};

const OutputContainerExport = connect(mapStateToProps)(OutputContainer);

export default OutputContainerExport;
