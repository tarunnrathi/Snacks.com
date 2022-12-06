import React, { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import "./filterList.scss";
import { Link, withRouter } from "react-router-dom";
import UrlConstants from "../../config/UrlConstants";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";

class FilterList extends Component {
  state = {
    selectedFilterList: [],
    isFilterApplied: false,
    //filterOptionList: [{"categoryId":"","title":"","showSearchBox":false,"subCategories":[{"value":"In Stock","displayName":"In Stock"},{"value":"New Arrival","displayName":"New Arrival"},{"value":"Limited Edition","displayName":"Limited Edition"}]},{"categoryId":"Flavors","title":"Flavor","showSearchBox":true,"subCategories":[{"value":"Barbecue","displayName":"Barbecue"},{"value":"Cheesy","displayName":"Cheesy"},{"value":"Plain","displayName":"Plain"},{"value":"Spicy","displayName":"Spicy"},{"value":"Other","displayName":"Other"}]},{"categoryId":"Brands","title":"Brand","showSearchBox":true,"subCategories":[{"value":"Cheetos","displayName":"CHEETOS"},{"value":"Doritos","displayName":"DORITOS"},{"value":"Frito Lay","displayName":"FRITO LAY"},{"value":"Fritos","displayName":"FRITOS"},{"value":"Funyuns","displayName":"FUNYUNS"},{"value":"Lay's","displayName":"LAY'S"},{"value":"Matador","displayName":"MATADOR"},{"value":"Munchies","displayName":"MUNCHIES"},{"value":"Ruffles","displayName":"RUFFLES"},{"value":"Sabritas","displayName":"SABRITAS"},{"value":"Smartfood","displayName":"SMARTFOOD"},{"value":"Tostitos","displayName":"TOSTITOS"}]},{"categoryId":"Price","title":"Price","showSearchBox":true,"subCategories":[{"value":"lessthan10","displayName":"less than $10"},{"value":"bet10to15","displayName":"Between $10 to$15"}]}],
    filterOptionList: this.props.filterOptionList,
    sortBy: 0,
    totalFilterApplied: 0,
    showMoreIndexes: [],
    selectedFiltersArray: [],
  };

  componentDidMount() {
    //console.log('======>filter state',this.state.filterOptionSearchedList);
    //const searchParamUrl = this.props.createSearchURL(this.props.location.search, '', '');
    // let filteredData = this.props.getFiltersFromUrl(this.props.location.search, true, '', this.props.filterOptionSearchedList);
    // filteredData.filterOptionSearchedList &&
    //   filteredData.filterOptionSearchedList.filter((item) => {
    //     if(item.categoryId && item.subCategories.length > UrlConstants.showSearchForFilterLimit) {
    //       item.showSearchBox = true;
    //     }
    //   })
    // this.setState({filterOptionSearchedList: filteredData.filterOptionSearchedList || []});
    // this.setState({selectedFiltersArray: filteredData.selectedFiltersArray || []});
    //const getFiltersFromUrl = this.props.getFiltersFromUrl();
    //console.log('getFiltersFromUrl',getFiltersFromUrl);
    //console.log('selectedFilterList',this.state.selectedFilterList);
    //console.log('filterOptionList===>',this.state.filterOptionList);
  }

  selectFilter = (heading, item, isChecked) => {
    const updatedFiltersResult = this.props.createSearchURL(
      heading,
      //heading.toLowerCase(),
      item.toLowerCase(),
      isChecked
    );
    //if(this.state.filterOptionList) {
    //let filteredData = this.props.getFiltersFromUrl(searchParamUrl, true, '', this.props.filterOptionList);
    //}

    // this.setState({filterOptionList: updatedFiltersResult.filterOptionSearchedList || []});
    // this.setState({selectedFiltersArray: updatedFiltersResult.selectedFiltersArray || []});
    // const { selectedFilterList, selectedList } = this.state;
    // let existing = this.state.selectedFilterList[heading]
    //   ? [...this.state.selectedFilterList[heading], item]
    //   : [item];

    // this.setState({
    //   isFilterSelected: true,
    //   isFilterApplied: true,
    //   selectedFilterList: {
    //     ...selectedFilterList,
    //     [heading]: existing,
    //   },
    // }, () => {
    //   this.props.getProductList(selectedFilters, this.state.sortBy);
    //   // this.props.selectedFilter(
    //   //   this.state.selectedFilterList,
    //   //   ""
    //   // )
    // });
  };

  handleFilterSearch = (heading, searchText, itemIndex) => {
    debugger;
    let filterOptionListTemp = [...this.props.filterOptionList];
    let filteredResult =
      filterOptionListTemp[itemIndex] &&
      filterOptionListTemp[itemIndex].subCategories.filter((option) => {
        option.hideOptionOnSearch = !option.displayName
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return option;
      });
    filterOptionListTemp[itemIndex].isSearched = searchText ? true : false;
    filterOptionListTemp[itemIndex].subCategories = filteredResult;
    this.setState({
      filterOptionList: filterOptionListTemp,
    });
  };

  handleShowMoreFilters = (index) => {
    let showMoreIndexes = this.state.showMoreIndexes;
    showMoreIndexes.push(index);
    this.setState({
      showMoreIndexes,
    });
  };

  // onFilterTextChange =()=>{

  // }

  render() {
    const { totalFilterApplied, showMoreIndexes } = this.state;
    const { filterOptionList, selectedFiltersArray } = this.props;
    if (!filterOptionList) return "";
    return (
      <div className="plp-filter">
        <div className="plp-filter-header">
          <div className="plp-filter-title">
            <img src="/svg/filter.svg" alt="filter" />
            Filters {totalFilterApplied != 0 && `(${totalFilterApplied})`}
          </div>
          <Button
            className="close-filter"
            aria-label="close filter"
            onClick={this.props.closeFilter}
          >
            <ClearIcon />
          </Button>
        </div>
        <div className="plp-filter-inner">
          <div className="plp-filter-tags">
            {selectedFiltersArray &&
              selectedFiltersArray.map((filterObj, filterIndex) => {
                return (
                  <Button className="tag-single">
                    {filterObj.displayName}
                    <ClearIcon
                      onClick={(event) =>
                        this.selectFilter(
                          filterObj.title,
                          filterObj.value,
                          false
                        )
                      }
                    />
                  </Button>
                );
              })}
            {selectedFiltersArray && selectedFiltersArray.length > 0 && (
              <div className="plp-filter-clear-wrapper">
                <Button className="plp-filter-clear">Clear All</Button>
              </div>
            )}
          </div>

          {filterOptionList.map((item, itemIndex) => {
            return (
              <div
                className="plp-filter-box"
                key={`filterHeading-${item.title}`}
              >
                {/* {!item.title ? */}
                {/* item.subCategories.map((option, optionIndex) => {
                  <div className="">
                    <FormControlLabel
                      className="plp-filter-label"
                      control={
                        <Checkbox
                          name="checkedBrand"
                          disableRipple
                          color="default"
                          checkedIcon={
                            <span className="icn-checkmark checked"></span>
                          }
                          icon={<span className="icn-checkmark uncheck"></span>}
                          // onClick={(event) => this.selectFilter(option.value, item.title, event.target.checked)}
                          // checked={option.isSelected ? true : false}
                        />
                      }
                      label={'ss'}
                    />
                  </div>
                  }) */}
                <Accordion
                  className="filter-accordion"
                  defaultExpanded
                  key={`accordion-${item.title}`}
                >
                  <AccordionSummary
                    expandIcon={
                      <>
                        <AddIcon className="collapsed" />
                        <RemoveIcon className="expanded" />
                      </>
                    }
                    aria-controls={`${item.title}-content`}
                    id={`${item.title}-header`}
                    classes={{
                      root: "filter-accordion-header",
                      content: "filter-accordion-content",
                      expandIcon: "filter-accordion-expandicon",
                    }}
                  >
                    {item.title}
                  </AccordionSummary>
                  <AccordionDetails className="filter-accordion-body">
                    <FormGroup row className="plp-filter-group">
                      {item.showSearchBox && (
                        <TextField
                          className="filter-search"
                          id={`${item.title}Search`}
                          fullWidth
                          label={`Search ${item.title}`}
                          placeholder={`Search ${item.title}`}
                          onChange={(e) =>
                            this.handleFilterSearch(
                              item.title,
                              e.target.value,
                              itemIndex
                            )
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className="hidden-adorn"
                                aria-hidden="true"
                              >
                                search
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                className="search-icon-wrapper"
                              >
                                <Button
                                  className="search-icon"
                                  aria-label="search"
                                >
                                  <img src="/svg/search.svg" alt="search" />
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      {item?.subCategories?.map((option, optionIndex) => {
                        if (
                          optionIndex >= UrlConstants.showMoreSubFiltersLimit &&
                          !item.isSearched &&
                          !showMoreIndexes.includes(itemIndex)
                        )
                          return true;
                        if (option.hideOptionOnSearch) return true;
                        return (
                          <FormControlLabel
                            key={`childOptions-${option.value}`}
                            className="plp-filter-label"
                            control={
                              <Checkbox
                                name="checkedBrand"
                                disableRipple
                                color="default"
                                checkedIcon={
                                  <span className="icn-checkmark checked"></span>
                                }
                                icon={
                                  <span className="icn-checkmark uncheck"></span>
                                }
                                onClick={(event) =>
                                  this.selectFilter(
                                    item.title,
                                    option.value,
                                    event.target.checked
                                  )
                                }
                                checked={option.isSelected ? true : false}
                              />
                            }
                            label={
                              item.title === "Price"
                                ? option.name
                                : option.displayName + ` (${option.count})`
                            }
                          />
                        );
                      })}
                      {item?.subCategories?.length >
                        UrlConstants.showMoreSubFiltersLimit &&
                        !showMoreIndexes.includes(itemIndex) &&
                        !item.isSearched && (
                          <Grid>
                            <Link
                              to={this.props.location.search}
                              aria-label={"Show more"}
                              className="show-more-btn"
                              onClick={() =>
                                this.handleShowMoreFilters(itemIndex)
                              }
                            >
                              Show More
                            </Link>
                          </Grid>
                        )}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                {/* } */}
              </div>
            );
          })}
          {/* <div className="plp-filter-box">
            <Accordion className="filter-accordion">
              <AccordionSummary
                expandIcon={
                  <>
                    <AddIcon className="collapsed" />
                    <RemoveIcon className="expanded" />
                  </>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                classes={{
                  root: "filter-accordion-header",
                  content: "filter-accordion-content",
                  expandIcon: "filter-accordion-expandicon",
                }}
              >
                Dietary Preferences
              </AccordionSummary>
              <AccordionDetails className="filter-accordion-body">
                <FormGroup row className="plp-filter-group">
                  <FormControlLabel
                    className="plp-filter-label"
                    control={
                      <Checkbox
                        name="checkedPref"
                        disableRipple
                        color="default"
                        checkedIcon={
                          <span className="icn-checkmark checked"></span>
                        }
                        icon={<span className="icn-checkmark uncheck"></span>}
                      />
                    }
                    label="Gluten-Free"
                  />
                  <FormControlLabel
                    className="plp-filter-label"
                    control={
                      <Checkbox
                        name="checkedPref"
                        disableRipple
                        color="default"
                        checkedIcon={
                          <span className="icn-checkmark checked"></span>
                        }
                        icon={<span className="icn-checkmark uncheck"></span>}
                      />
                    }
                    label="Dairy-Free"
                  />
                  <FormControlLabel
                    className="plp-filter-label"
                    control={
                      <Checkbox
                        name="checkedPref"
                        disableRipple
                        color="default"
                        checkedIcon={
                          <span className="icn-checkmark checked"></span>
                        }
                        icon={<span className="icn-checkmark uncheck"></span>}
                      />
                    }
                    label="Vegan"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div> */}
        </div>
        <div className="plp-filter-footer">
          <Button className="theme-btn theme-btn-bordered">Reset</Button>
          <Button className="theme-btn theme-btn-filled">See Results</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(FilterList);
