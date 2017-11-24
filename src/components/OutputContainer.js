// Display output from validator.js
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody
} from "carbon-components-react";

import OutputItem from "./OutputItem";

export class OutputContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      read_1_failure: false,
      read_2_failure: false,
      single_index_failure: false
    };
  }
  // there might be a nicer way to do this
  calculateProportions(tag, sum) {
    let obj = {
      a: tag[0] / sum,
      t: tag[1] / sum,
      c: tag[2] / sum,
      g: tag[3] / sum
    };
    //console.log("Object: ", obj);
    let bad_bases = [];
    let entries = Object.entries(obj);
    for (let i = 0; i < entries.length; i++) {
      //console.log("checking: ", obj[entries[i][0]]);
      obj[entries[i][0]] > 0.95 ? bad_bases.push(entries[i][0]) : null;
    }
    return bad_bases;
  }

  componentWillMount() {
    if (this.props.indexing === "dual") {
      //Calculate what to render for the first index read
      this.read_1 = this.props.composition[0].map((tag, index) => {
        let sum = tag.reduce((prev, curr) => prev + curr);
        let bad_bases = this.calculateProportions(tag, sum);
        if (this.state.read_1_failure) {
          // console.log("already set");
        } else if (bad_bases.length >= 1) {
          this.setState({ read_1_failure: true });
          // console.log(
          //   "Bad bases for col",
          //   index + 1,
          //   "index read 1 :",
          //   bad_bases
          // );

          return (
            <OutputItem
              colour={true}
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        } else {
          return (
            <OutputItem
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        }
      });
      //Calculate what to render for the second index read
      this.read_2 = this.props.composition[1].map((tag, index) => {
        let sum = tag.reduce((prev, curr) => prev + curr);
        let bad_bases = this.calculateProportions(tag, sum);
        if (this.state.read_2_failure) {
          // console.log("already set");
        } else if (bad_bases.length >= 1) {
          this.setState({ read_2_failure: true });
          // console.log(
          //   "Bad bases for col",
          //   index + 1,
          //   "index read 2 :",
          //   bad_bases
          // );
          return (
            <OutputItem
              colour={true}
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        } else {
          return (
            <OutputItem
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        }
      });
    } else if (this.props.indexing === "single") {
      //Calculate what to render for the first index read
      this.single_read = this.props.composition.map((tag, index) => {
        let sum = tag.reduce((prev, curr) => prev + curr);
        let bad_bases = this.calculateProportions(tag, sum);
        if (this.state.read_1_failure) {
          // console.log("already set");
        } else if (bad_bases.length >= 1) {
          this.setState({ single_index_failure: true });
          // console.log("Bad bases for col", index + 1, ":", bad_bases);
          return (
            <OutputItem
              colour={true}
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        } else {
          return (
            <OutputItem
              key={index}
              colNo={index + 1}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={sum}
            />
          );
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.indexing === "dual" ? (
          <Accordion>
            <AccordionItem
              title="Composition: Index read 1"
              style={{
                background: this.state.read_1_failure
                  ? "rgba(231, 29, 50, 0.55)"
                  : "rgba(92, 167, 0, 0.55)"
              }}
            >
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
                <TableBody>{this.read_1}</TableBody>
              </Table>
            </AccordionItem>
            <AccordionItem
              title="Composition: Index read 2"
              style={{
                background: this.state.read_2_failure
                  ? "rgba(231, 29, 50, 0.55)"
                  : "rgba(92, 167, 0, 0.55)"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow header>
                    <TableHeader> Cycle </TableHeader>
                    <TableHeader> A </TableHeader>
                    <TableHeader> T </TableHeader>
                    <TableHeader> C </TableHeader>
                    <TableHeader> G </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>{this.read_2}</TableBody>
              </Table>
            </AccordionItem>
          </Accordion>
        ) : (
          <Accordion>
            <AccordionItem
              title="Composition: Index read"
              style={{
                background: this.state.single_index_failure
                  ? "rgba(231, 29, 50, 0.55)"
                  : "rgba(92, 167, 0, 0.55)"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow header>
                    <TableHeader> Cycle </TableHeader>
                    <TableHeader> A </TableHeader>
                    <TableHeader> T </TableHeader>
                    <TableHeader> C </TableHeader>
                    <TableHeader> G </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>{this.single_read}</TableBody>
              </Table>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    );
  }
}

OutputContainer.propTypes = {
  composition: PropTypes.shape({
    composition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }),
  indexing: PropTypes.string
};

export const mapStateToProps = state => {
  return {
    composition: state.fileHandler.overview.composition
  };
};

const OutputContainerExport = connect(mapStateToProps)(OutputContainer);

export default OutputContainerExport;
