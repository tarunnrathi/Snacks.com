import React from "react";
import { shallow } from "enzyme";
import SearchFilter from "./SearchFilter";
import APIUtil from "./../../../config/APIUtil";

window.localStorage.setItem("_lo_No", "dfdfhrvgy");

// response mock ndata for filterlist API
let returnData = {
  success: true,
  data: {
    Brand: [
      "BAKED",
      "BAKEN-ETS",
      "BARE",
      "CAP\u0027N CRUNCH",
      "CHEETOS",
      "CHESTER\u0027S",
      "CRACKER JACK",
      "DORITOS",
      "EL ISLENO",
      "EXTRA",
      "FRITO LAY",
      "FRITOS",
      "FUNYUNS",
      "GAMESA",
      "GRANDMA\u0027S",
      "LAY\u0027S",
      "LIFE SAVERS",
      "M\u0026M\u0027S",
      "MISS VICKIE\u0027S",
      "MUNCHIES",
      "MUNCHOS",
      "NUT HARVEST",
      "OFF THE EATEN PATH",
      "PASTA RONI",
      "QUAKER",
      "RICE A RONI",
      "ROLD GOLD",
      "RUFFLES",
      "SABRITAS",
      "SABRITONES",
      "SIMPLY",
      "SKITTLES",
      "SMARTFOOD",
      "SNICKERS",
      "SPITZ",
      "STACY\u0027S",
      "STARBURST",
      "SUNCHIPS",
      "TOSTITOS",
    ],
    "Snack Type": [
      "Candy",
      "Cereal",
      "Cheese Puffs",
      "Cookies \u0026 Crackers",
      "Corn Chips",
      "Dips",
      "Entertaining",
      "Fruit \u0026 Veggie Chips",
      "Gaming",
      "Gum",
      "Movie Night",
      "Multigrain Snacks",
      "New",
      "Nuts \u0026 Seeds",
      "Other",
      "Pita Chips",
      "Popcorn",
      "Pork Rinds",
      "Potato Chips",
      "Pretzels",
      "Rice \u0026 Pasta",
      "Rice / Pasta",
      "Tortilla Chips",
    ],
    Flavor: [
      "Barbecue",
      "Cheese Puffs",
      "Cheesy",
      "Chocolate",
      "Everything Else",
      "Fruity",
      "Original",
      "Peanut",
      "Peppermint",
      "Plain",
      "Spicy",
      "Tangy",
      "Tortilla Chips",
    ],
    Occasion: [
      "Cheetos",
      "Doritos",
      "Entertaining",
      "Gaming",
      "Movie Night",
      "On The Go",
      "Work/Study Break",
    ],
  },
};
APIUtil.postMethod = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ data: returnData }));

const wrapper = shallow(
  <SearchFilter
    filterMainHeading={true}
    clearAllfilters={jest.fn()}
    selectedFilter={jest.fn()}
  />
);

describe("SearchFilter component", () => {
  it("SearchFilter component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test hideFilterDropdown & showSelectedFiteres functions", () => {
    //selected filter data
    const selectedFilterList = [
      [
        {
          heading: ["Doritos", "lays"],
        },
      ],
    ];
    wrapper.setState({ selectedFilterList, selectedFilterList });

    const event = { keyCode: 27 };
    wrapper.instance().hideFilterDropdown(event);
  });

  it("mock response value for filterProduct API", () => {
    let returnData = {
      success: true,
      data: {
        Brand: [
          "BAKED",
          "BAKEN-ETS",
          "BARE",
          "CAP\u0027N CRUNCH",
          "CHEETOS",
          "CHESTER\u0027S",
          "CRACKER JACK",
          "DORITOS",
          "EL ISLENO",
          "EXTRA",
          "FRITO LAY",
          "FRITOS",
          "FUNYUNS",
          "GAMESA",
          "GRANDMA\u0027S",
          "LAY\u0027S",
          "LIFE SAVERS",
          "M\u0026M\u0027S",
          "MISS VICKIE\u0027S",
          "MUNCHIES",
          "MUNCHOS",
          "NUT HARVEST",
          "OFF THE EATEN PATH",
          "PASTA RONI",
          "QUAKER",
          "RICE A RONI",
          "ROLD GOLD",
          "RUFFLES",
          "SABRITAS",
          "SABRITONES",
          "SIMPLY",
          "SKITTLES",
          "SMARTFOOD",
          "SNICKERS",
          "SPITZ",
          "STACY\u0027S",
          "STARBURST",
          "SUNCHIPS",
          "TOSTITOS",
        ],
        "Snack Type": [
          "Candy",
          "Cereal",
          "Cheese Puffs",
          "Cookies \u0026 Crackers",
          "Corn Chips",
          "Dips",
          "Entertaining",
          "Fruit \u0026 Veggie Chips",
          "Gaming",
          "Gum",
          "Movie Night",
          "Multigrain Snacks",
          "New",
          "Nuts \u0026 Seeds",
          "Other",
          "Pita Chips",
          "Popcorn",
          "Pork Rinds",
          "Potato Chips",
          "Pretzels",
          "Rice \u0026 Pasta",
          "Rice / Pasta",
          "Tortilla Chips",
        ],
        Flavor: [
          "Barbecue",
          "Cheese Puffs",
          "Cheesy",
          "Chocolate",
          "Everything Else",
          "Fruity",
          "Original",
          "Peanut",
          "Peppermint",
          "Plain",
          "Spicy",
          "Tangy",
          "Tortilla Chips",
        ],
        Occasion: [
          "Cheetos",
          "Doritos",
          "Entertaining",
          "Gaming",
          "Movie Night",
          "On The Go",
          "Work/Study Break",
        ],
      },
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: returnData }));
    //wrapper.instance().getFilterList(values);
  });

  it("test checkExistingFilters function by providing input categoryList data", () => {
    // selectedCategory data for checkExistingFilters() to use
    const categoryList = [
      {
        categoryId: "001",
        subCategoryIdList: "012",
      },
    ];
    window.sessionStorage.setItem(
      "selectedCategory",
      JSON.stringify(categoryList)
    );
    // const wrapper2 = shallow(<SearchFilter />);
    // wrapper2.instance().checkExistingFilters();
  });

  it("test selectFilter function", () => {
    //selected filter data
    const selectedFilterList = {
      heading: ["Doritos", "lays"],
    };
    wrapper.instance().selectFilter(selectedFilterList, 1);
  });

  it("test searchTriggered function", () => {
    const event = {
      target: {
        value: "brand",
      },
    };
    const response = wrapper.instance().searchTriggered(event);
    expect(wrapper.state().globalSearch).toBe(event.target.value);
    expect(wrapper.state().isFilterApplied).toBe(false);
  });

  it("test clearAllfilters function", () => {
    wrapper.instance().clearAllfilters();
    expect(wrapper.state().toggleFilterList).toBe(false);
    expect(wrapper.state().globalSearch).toBe("");
    expect(wrapper.state().selectedFilterList).toStrictEqual([]);
    expect(wrapper.state().isFilterSelected).toBe(false);
    expect(wrapper.state().isFilterApplied).toBe(false);
    expect(wrapper.state().isSearchApplied).toBe(false);
    expect(wrapper.state().selectedList).toStrictEqual([]);
  });

  it("test removeFilter function", () => {
    //selected filter data
    const selectedFilterList = {
      heading: ["Doritos", "lays"],
    };
    wrapper.setState({ selectedFilterList, selectedFilterList });
    wrapper.instance().removeFilter("Doritos", "heading");
    expect(wrapper.state().isFilterApplied).toBe(false);
  });

  it("test commonFilterButton function", () => {
    wrapper.instance().commonFilterButton();
  });

  it("test renderFilters function", () => {
    const filter = ["Doritos", "lays"];
    wrapper.instance().renderFilters(filter, "heading", 0);
  });

  it("test applySelectedFilters function", () => {
    wrapper.instance().applySelectedFilters();

    //if this.state.globalSearch is true
    wrapper.setState({ globalSearch: true });
    wrapper.instance().applySelectedFilters();
  });

  it("testing all events", () => {

    wrapper.find("#filters").simulate("click");

    wrapper.setState({ isFilterSelected: true });
    wrapper.setState({
      selectedList: ["doritos", "lays", "chitos", "chilli", "wings", "hot"],
    });
    wrapper.find(".filter-showall").simulate("click");
  });
});
