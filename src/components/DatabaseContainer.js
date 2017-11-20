// Display results of querying database json
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ObjectInspector } from "react-inspector";
import DatabaseItem from "./DatabaseItem";

import "./DatabaseContainer.css";

import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  ModalWrapper
} from "carbon-components-react";

//Don't want to import a whole library for one function.
// arrayCompare :: (a -> a -> Bool) -> [a] -> [a] -> Bool
export const arrayCompare = f => ([x, ...xs]) => ([y, ...ys]) => {
  if (x === undefined && y === undefined) return true;
  else if (!f(x)(y)) return false;
  else return arrayCompare(f)(xs)(ys);
};

//equal :: a -> a -> Bool
export const equal = x => y => x === y;

// arrayEqual :: [a] -> [a] -> Bool
export const arrayEqual = arrayCompare(equal);

export const includesArray = (array, comparator) => {
  return array.some(item => {
    //console.log("Item: ", item, "Comp: ", comparator);
    return arrayEqual(item)(comparator);
  });
};

export const distinctArray = array =>
  array.reduce((acc, cur) => {
    //console.log("Acc: ", acc, "Cur: ", cur);
    includesArray(acc, cur) ? null : acc.push(cur);
    return acc;
  }, []);

// const distinctArray = array => {
//   let outputArray = [];
//   array.forEach(
//     item => (includesArray(outputArray, item) ? null : outputArray.push(item))
//   );
//   return outputArray;
// };

export const getCount = tags => {
  let flattened = Object.keys(tags)
    .map(tag => tags[tag])
    .reduce((a, c) => a.concat(c), []);
  //console.log("flattened array (without tags) in getCount", flattened);
  let distinctFlattened = distinctArray(flattened);

  let count = [...new Set(distinctFlattened)].map(tagGroup => [
    tagGroup,
    flattened.filter(x => arrayEqual(x)(tagGroup)).length
  ]);
  //console.log("distinct: ", count);
  return count;
};

//tags and tagsConcat are objects where the key is the tag or concatenated tag
//and the value is an array containing arrays of tag sets of the form:
//[142, "Magic Tag Group"]

export class DatabaseContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      individual: false,
      concatenated: false,
      singleIndex: false
    };
  }

  componentWillMount() {
    if (this.props.indexing === "dual") {
      this.individualTags = getCount(this.props.tags).map(tagGroup => {
        if (this.state.individual) {
          // console.log("already set");
        } else if (tagGroup[1] === this.props.length) {
          this.setState({ individual: true });
          // console.log("setting true");
        }
        return (
          <DatabaseItem
            key={tagGroup[0][0]}
            id={tagGroup[0][0]}
            name={tagGroup[0][1]}
            matches={tagGroup[1]}
          />
        );
      });

      this.concatenatedTags = getCount(this.props.tagsConcat).map(tagGroup => {
        if (this.state.concatenated) {
          // console.log("already set");
        } else if (tagGroup[1] === this.props.length) {
          this.setState({ concatenated: true });
          // console.log("setting true");
        }
        return (
          <DatabaseItem
            key={tagGroup[0][0]}
            id={tagGroup[0][0]}
            name={tagGroup[0][1]}
            matches={tagGroup[1]}
          />
        );
      });
    } else {
      this.singleIndexTags = getCount(this.props.tagsConcat).map(tagGroup => {
        if (this.state.concatenated) {
          // console.log("already set");
        } else if (tagGroup[1] === this.props.length) {
          this.setState({ singleIndex: true });
          // console.log("setting true");
        }
        return (
          <DatabaseItem
            key={tagGroup[0][0]}
            id={tagGroup[0][0]}
            name={tagGroup[0][1]}
            matches={tagGroup[1]}
          />
        );
      });
    }
  }

  render() {
    // console.log(
    //   "here!",
    //   this.props.length,
    //   this.state.individual,
    //   this.state.concatenated
    // );
    return (
      <div>
        {this.props.indexing === "dual" ? (
          <Accordion>
            <AccordionItem
              title="Database: Individual Tags"
              style={{
                background: this.state.individual
                  ? "rgba(92, 167, 0, 0.55)"
                  : "rgba(231, 29, 50, 0.55)"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow header>
                    <TableHeader> Group name </TableHeader>
                    <TableHeader> Group ID </TableHeader>
                    <TableHeader> Matches </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>{this.individualTags}</TableBody>
              </Table>
              <div id="Modal">
                <ModalWrapper
                  id="detail-modal"
                  buttonTriggerText="Detailed Results"
                  modalLabel="Detailed Results"
                  modalHeading="Single Tags"
                  passiveModal
                >
                  <div className="bx--modal-content__text">
                    <div id="Inspector">
                      {/* /<ObjectInspector expandLevel={3} data={this.props.tags} /> */}
                    </div>
                  </div>
                </ModalWrapper>
              </div>
            </AccordionItem>
            <AccordionItem
              title="Database: Concatenated Tags"
              style={{
                background: this.state.concatenated
                  ? "rgba(92, 167, 0, 0.55)"
                  : "rgba(231, 29, 50, 0.55)"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow header>
                    <TableHeader> Group name </TableHeader>
                    <TableHeader> Group ID </TableHeader>
                    <TableHeader> Matches </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>{this.concatenatedTags}</TableBody>
              </Table>
              <div id="Modal">
                <ModalWrapper
                  id="detail-modal"
                  buttonTriggerText="Detailed Results"
                  modalLabel="Detailed Results"
                  modalHeading="Concatenated Tags"
                  passiveModal
                >
                  <div className="bx--modal-content__text">
                    <div id="Inspector">
                      <ObjectInspector
                        expandLevel={3}
                        data={this.props.tagsConcat}
                      />
                    </div>
                  </div>
                </ModalWrapper>
              </div>
            </AccordionItem>
          </Accordion>
        ) : (
          <Accordion
            style={{
              background: this.state.singleIndex
                ? "rgba(92, 167, 0, 0.55)"
                : "rgba(231, 29, 50, 0.55)"
            }}
          >
            <AccordionItem title="Database">
              <Table>
                <TableHead>
                  <TableRow header>
                    <TableHeader> Group name </TableHeader>
                    <TableHeader> Group ID </TableHeader>
                    <TableHeader> Matches </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>{this.singleIndexTags}</TableBody>
              </Table>
              <div id="Modal">
                <ModalWrapper
                  id="detail-modal"
                  buttonTriggerText="Detailed Results"
                  modalLabel="Detailed Results"
                  modalHeading="Single Tags"
                  passiveModal
                >
                  <div className="bx--modal-content__text">
                    <div id="Inspector">
                      <ObjectInspector expandLevel={3} data={this.props.tags} />
                    </div>
                  </div>
                </ModalWrapper>
              </div>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    );
  }
}

DatabaseContainer.propTypes = {
  tags: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array)),
  tagsConcat: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array)),
  indexing: PropTypes.string.isRequired,
  length: PropTypes.number
};

export const filterCache = (cache, tags) => {
  //1. Make data usable
  let flattened = tags.reduce((acc, cur) => acc.concat(cur), []);
  //console.log(flattened);
  //2. Actually filter
  let filtered = flattened.reduce((result, key) => {
    if (result[key]) {
      result[key] = result[key].concat(cache[key]);
    } else {
      result[key] = cache[key];
    }
    return result;
  }, {});
  //console.log("output from filterCache", filtered);
  return filtered;
};

//in case an object with the count is ever needed instead
// export const filterCache = (cache, tags) => {
//   //1. Make data usable
//   let flattened = tags.reduce((acc, cur) => acc.concat(cur), []);
//   //console.log(flattened);
//   //2. Actually filter
//   let filtered = flattened.reduce((result, key) => {
//     if (result[key]) {
//       result[key]["count"] += 1;
//     } else {
//       result[key] = { ...cache[key], count: 1 };
//     }
//     return result;
//   }, {});
//   console.log("output from filterCache", filtered);
//   return filtered;
// };

export const filterCacheConcat = (cache, tags) => {
  let concat = tags.map(e => {
    return e.join("");
  });
  let filtered = concat.reduce((result, key) => {
    result[key] = cache[key];
    return result;
  }, {});
  return filtered;
};
//2. Filter

export const mapStateToProps = state => {
  return {
    tags: filterCache(state.cache.data.tag_db, state.fileHandler.cleanData),
    tagsConcat: filterCacheConcat(
      state.cache.data.tag_db,
      state.fileHandler.cleanData
    ),
    length: state.fileHandler.cleanData.length
  };
};

const DatabaseContainerExport = connect(mapStateToProps)(DatabaseContainer);

export default DatabaseContainerExport;
