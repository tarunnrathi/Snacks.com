import React, { Component } from "reactn";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import APIUtil from "./../../../config/APIUtil";
import UrlConstants from "./../../../config/UrlConstants";
import "./searchFilter.scss";
import validateAPIResponse from "../../ApiHelper";
import qs from "query-string";
import { isMobileOnly } from "react-device-detect";
import { toTitleCase } from "../../../components/Utils";
import { Button, Grid } from "@mui/material";

export default class SearchFilter extends Component {
  parsedQueryString = qs.parse(window.location.search);
  state = {
    isFilterLoading: true,
    filterList: [],
    toggleFilterList: false,
    isFilterApplied: false,
    globalSearch: "",
    isSearchApplied: false,
    isFilterSelected: false,
    selectedFilterList: [],
    selectedList: [],
    selectedSubmenu: "",
  };

  hideFilterDropdown = (event) => {
    // ESC
    if (event.keyCode === 27) this.setState({ toggleFilterList: false });
  };

  componentDidMount() {
    if (localStorage.getItem("_lo_No")) {
      this.getFilterList();
    } else {
      setTimeout(() => {
        this.setState(
          { locationNumber: localStorage.getItem("_lo_No") },
          () => {
            this.getFilterList();
          }
        );
      }, 8000);
    }

    if (this.parsedQueryString.productName) {
      this.setState({
        locationNumber: localStorage.getItem("_lo_No"),
      });
    }
    this.checkExistingFilters();
    document.addEventListener("keydown", this.hideFilterDropdown);
    if (this.props.selectedSubmenu) {
      this.setState(
        {
          selectedFilterList: [],
          selectedList: [],
          selectedSubmenu: this.props.selectedSubmenu,
          selectedMenu: this.props.selectedMenu,
          isFilterApplied: true,
          isFilterSelected: true,
        },
        () => {
          this.selectFilter(
            this.props.selectedSubmenu,
            this.props.selectedMenu,
            true
          );
        }
      );
    }
  }

  componentDidUpdate() {
    const { selectedSubmenu, selectedMenu } = this.props;

    if (selectedSubmenu) {
      if (selectedSubmenu !== this.state.selectedSubmenu) {
        this.setState(
          {
            selectedFilterList: [],
            selectedList: [],
            selectedSubmenu: selectedSubmenu,
            selectedMenu: selectedMenu,
            isFilterApplied: true,
            isFilterSelected: true,
          },
          () => {
            this.selectFilter(selectedSubmenu, selectedMenu, true);
          }
        );
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.hideFilterDropdown);
  }

  checkExistingFilters = () => {
    const selectedCategory = sessionStorage.getItem("selectedCategory")
      ? JSON.parse(sessionStorage.getItem("selectedCategory"))
      : [];
    let existingFilters = [],
      existingSelectedList = [];

    if (selectedCategory.length > 0) {
      selectedCategory.map((item) => {
        const { categoryId, subCategoryIdList } = item;
        if (subCategoryIdList) {
          existingFilters = {
            ...existingFilters,
            [categoryId]: subCategoryIdList,
          };
          existingSelectedList = [
            ...new Set([...existingSelectedList, ...subCategoryIdList]),
          ];
        }
        return "";
      });

      this.setState({
        selectedFilterList: existingFilters,
        isFilterSelected: true,
        isFilterApplied: true,
        selectedList: existingSelectedList,
      });
    }
  };

  getFilterList = () => {
    const payload = {
      locationNumber:
        sessionStorage.getItem("alternateOrderLocationId") ||
        sessionStorage.getItem("_lo_No") ||
        localStorage.getItem("_lo_No"),
    };

    APIUtil.postMethod(UrlConstants.FilterProducts, payload, true)
      .then((response) => {
        if (validateAPIResponse(response)) {
          this.setState({
            isFilterLoading: false,
            filterList: response.data.data,
          });
        }
      })
      .catch((error) => console.error("Search Filter Api", error));
  };

  selectFilter = (item, heading, filterApplied) => {
    const { selectedFilterList, selectedList } = this.state;

    let existing = this.state.selectedFilterList[heading]
      ? [...this.state.selectedFilterList[heading], item]
      : [item];
    const selectedFilterValue = Object.values(existing);

    this.setState({
      selectedList: [...new Set([...selectedList, ...selectedFilterValue])],
      isFilterSelected: true,
      isFilterApplied: filterApplied || false,
      selectedFilterList: {
        ...selectedFilterList,
        [heading]: existing,
      },
    });
  };

  searchTriggered = (event) => {
    const term = event.target.value;
    this.setState({ globalSearch: term, isFilterApplied: false });
  };

  clearAllfilters = () => {
    this.setGlobal({
      selectedSubmenu: "",
      selectedMenu: "",
    });
    this.setState({
      toggleFilterList: false,
      globalSearch: "",
      selectedFilterList: [],
      isFilterSelected: false,
      isFilterApplied: false,
      isSearchApplied: false,
      selectedList: [],
      selectedSubmenu: "",
      selectedMenu: "",
    });

    this.props.clearAllfilters();
  };

  removeFilter = (filter, heading) => {
    const { selectedFilterList, selectedList } = this.state;
    if (selectedFilterList[heading]) {
      const selectedIndex = selectedFilterList[heading].indexOf(filter);
      if (selectedIndex > -1) {
        const sIndex = selectedList.indexOf(filter);
        selectedList.splice(sIndex, 1);
        selectedFilterList[heading].splice(selectedIndex, 1);
        this.setState({
          selectedFilterList,
          isFilterApplied: false,
          selectedList,
          selectedSubmenu: "",
          selectedMenu: "",
        });
      }
    }
    if (this.global?.selectedSubmenu) {
      this.setGlobal({
        selectedSubmenu: "",
        selectedMenu: "",
      });
    }
  };

  commonFilterButton = () => {
    const { selectedList } = this.state;
    return (
      <div className="filter-group-footer">
        <Button
          className="filter-clear"
          aria-label={`Clear Filter`}
          onClick={this.clearAllfilters}
        >
          Clear ({selectedList.length})
        </Button>
        <Button
          className="filter-apply"
          aria-label={`Apply selected filters`}
          onClick={this.applySelectedFilters}
          disabled={selectedList.length <= 0 ? true : false}
        >
          Apply
        </Button>
      </div>
    );
  };

  renderFilters = (filter, heading, mainIndex) => {
    const { selectedFilterList } = this.state;
    return (
      <div
        className={`filters ${heading.replace(/\s+/g, "-").toLowerCase()}`}
        key={mainIndex}
      >
        <h2 className="filter-heading">{heading}</h2>
        <ul className="filter-list">
          {filter.map((item, index) => {
            const compareFilter =
              selectedFilterList[heading] &&
              (selectedFilterList[heading].includes(item) ||
                selectedFilterList[heading].includes(item.toLowerCase()));
            return (
              <li
                className={`${compareFilter ? "selected" : ""}`}
                key={`${item}-${index}`}
              >
                <Button
                  onClick={() =>
                    compareFilter
                      ? this.removeFilter(item, heading)
                      : this.selectFilter(item, heading)
                  }
                  aria-label={`${item}`}
                >
                  {toTitleCase(item)}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  applySelectedFilters = () => {
    this.setState({ toggleFilterList: false, isFilterApplied: true });
    if (this.state.globalSearch) {
      this.setState({ isSearchApplied: true });
    }
    this.props.selectedFilter(
      this.state.selectedFilterList,
      this.state.globalSearch
    );
  };

  renderSelectedFilters = (filter, heading) => (
    <Button
      key={filter}
      aria-label={`${filter}`}
      onClick={() => this.removeFilter(filter, heading)}
    >
      {filter}
      <ClearIcon style={{ fontSize: 16 }} />
    </Button>
  );

  showSelectedFiteres = () => {
    const { selectedFilterList } = this.state;
    const selectedFilterKey = Object.keys(selectedFilterList);
    const selectedFilterValue = Object.values(selectedFilterList);

    return selectedFilterKey.map((heading, index) =>
      selectedFilterValue[index].map(
        (filter) => filter && this.renderSelectedFilters(filter, heading)
      )
    );
  };

  render() {
    const { filterMainHeading } = this.props;
    const {
      filterList,
      toggleFilterList,
      globalSearch,
      selectedList,
      isFilterSelected,
      isFilterApplied,
      isSearchApplied,
    } = this.state;
    const filterKey = Object.keys(filterList);
    const filterValue = Object.values(filterList);

    return (
      <div
        className={`search-filter sticky-head ${
          toggleFilterList ? "open" : ""
        } ${
          isFilterSelected && selectedList.length !== 0 ? "filter-applied" : ""
        }`}
      >
        <div className="sticky-head-inner">
          <Grid item container spacing={0}>
            {filterMainHeading && (
              <Grid item className="search-filter-title">
                <h1 className="sticky-title" aria-label={filterMainHeading}>
                  {filterMainHeading}
                </h1>
              </Grid>
            )}
            <Grid item xs container className="search-filter-content">
              <Grid item container spacing={3} className="product-filter-group">
                <Grid item xs={12} lg={8} sm={8} className="filter">
                  <Button
                    id="filters"
                    className={`filter-dropdown ${
                      isMobileOnly ? "with-border" : ""
                    }`}
                    onClick={() =>
                      this.setState({
                        toggleFilterList: !this.state.toggleFilterList,
                      })
                    }
                    aria-expanded={toggleFilterList}
                    aria-controls="expandable"
                    aria-label="click here to open filter dropdown"
                  >
                    filters
                    {!toggleFilterList && <ExpandMoreIcon />}
                    {toggleFilterList && <ExpandLessIcon />}
                  </Button>{" "}
                  {(isFilterSelected || globalSearch || isSearchApplied) &&
                    !isFilterApplied && (
                      <Button
                        className="btn-primary filter-apply-web"
                        aria-label={`Apply selected filters`}
                        onClick={this.applySelectedFilters}
                      >
                        Apply
                      </Button>
                    )}
                  {(isFilterSelected || globalSearch || isSearchApplied) && (
                    <Button
                      className="btn-secondary"
                      aria-label={`Clear all selected filters`}
                      onClick={this.clearAllfilters}
                    >
                      Clear All
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12} sm={12} className="selected-filters">
            {this.showSelectedFiteres()}
            {isMobileOnly && selectedList && selectedList?.length > 0 && (
              <Button
                className="btn-link clear-link"
                aria-label={`Clear all selected filters`}
                onClick={this.clearAllfilters}
              >
                Clear All
              </Button>
            )}
            {isFilterSelected && selectedList.length > 5 && (
              <Button
                className="filter-showall"
                aria-label="show all selected filters"
                onClick={() =>
                  this.setState({
                    toggleFilterList: !this.state.toggleFilterList,
                  })
                }
              >
                Show all
              </Button>
            )}
          </Grid>

          {toggleFilterList && (
            <Grid container className="filter-group" spacing={3}>
              {toggleFilterList && (
                <div className="filter-group-header">
                  <div className="filter-title-mob page-heading">
                    Filter your Search
                  </div>
                  <Button
                    className="close-filter"
                    aria-label="close filter"
                    onClick={this.applySelectedFilters}
                  >
                    <ClearIcon />
                  </Button>
                </div>
              )}
              <div className="filter-group-body">
                {filterKey.map((item, index) =>
                  this.renderFilters(
                    filterValue[index],
                    item,
                    `${item}-${index}`
                  )
                )}
              </div>
              {this.commonFilterButton()}
            </Grid>
          )}
        </div>
      </div>
    );
  }
}
