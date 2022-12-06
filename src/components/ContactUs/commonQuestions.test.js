import React from "react";
import { shallow } from "enzyme";
import commonQuestions from "./commonQuestions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("CommonQuestion component", () => {
  const props = {
    actionFaqQuestions: jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          success: true,
          message: "",
          offset: 0,
          limit: 36,
          totalProducts: 142,
          Groups: [
            [
              {
                id: 126834,
                mixCountName: "30 COUNT ",
                zNonSku: "00028400480368",
                mixCount: 30,
                price: "19.5",
                currency: "$",
                shortDescription: "",
                longDescription:
                  "Looking for Lay’s? Fired up for Fritos? You choose which of your snack-sized favorites go in your personalized 30-count Variety Pack.",
                productTitle: "Custom 30ct Variety Pack",
                heading: "Make Your Own Variety Pack",
                multipackCartHeading:
                  "Pick 30 items to build your customized Variety Pack",
                multipackCartItemsOut: "items out of 30",
                multipackId: "MYOMP-30",
                image:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                confirmationHeading: "CONGRATULATIONS",
                confirmationDesc:
                  "Head to the check out or keep browsing all of your favorite Frito-Lay snacks.",
                confirmationSubHeading: "You’ve hit the snackpot!",
                confirmationContinueBtn: "Continue Shopping",
                confirmationCheckoutBtn: "Proceed to checkout",
                disableMultipack: false,
                buildText: "build",
                notifyMeText: "notify me",
                varietyPackAvailableQty: "100",
                confirmationImage:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                promotionalPrice: "17.5",
                limitedOffer: "Limited Time Offer!",
                seeBelowInfo: "*See below for packaging information",
                outOfStock: "Out Of Stock",
              },
            ],
          ],
        },
      })
    ),
    faqQuestions: { data: ["ques1", "ques2"] },
    selectedQuestionId: "126851",
  };
  const wrapper = shallow(
    <commonQuestions.WrappedComponent store={store} {...props} />
  );

  it("render CommonQuestion component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test handleChange function", () => {
    wrapper.instance().handleChange("1234");
  });

  // it('test getQuestionsListing function', () => {
  //     props.faqQuestions.message = "faq message";
  //     wrapper.setProps({faqQuestions: props.faqQuestions});
  //     wrapper.setProps({selectedQuestionId: "126851"});
  //     wrapper.setProps({actionFaqQuestions: jest.fn().mockImplementation(() => Promise.resolve({status: 200, data: {"success":true,"message":"","offset":0,"limit":36,"totalProducts":142,"Groups":[[{"id":126834,"mixCountName":"30 COUNT ","zNonSku":"00028400480368","mixCount":30,"price":"19.5","currency":"$","shortDescription":"","longDescription":"Looking for Lay’s? Fired up for Fritos? You choose which of your snack-sized favorites go in your personalized 30-count Variety Pack.","productTitle":"Custom 30ct Variety Pack","heading":"Make Your Own Variety Pack","multipackCartHeading":"Pick 30 items to build your customized Variety Pack","multipackCartItemsOut":"items out of 30","multipackId":"MYOMP-30","image":"https://ospep-develop.azurefd.net/www/images/30-count-multipack.png","confirmationHeading":"CONGRATULATIONS","confirmationDesc":"Head to the check out or keep browsing all of your favorite Frito-Lay snacks.","confirmationSubHeading":"You’ve hit the snackpot!","confirmationContinueBtn":"Continue Shopping","confirmationCheckoutBtn":"Proceed to checkout","disableMultipack":false,"buildText":"build","notifyMeText":"notify me","varietyPackAvailableQty":"100","confirmationImage":"https://ospep-develop.azurefd.net/www/images/30-count-multipack.png","promotionalPrice":"17.5","limitedOffer":"Limited Time Offer!","seeBelowInfo":"*See below for packaging information","outOfStock":"Out Of Stock"}]]}})) });
  //     wrapper.instance().getQuestionsListing();
  // });

  it("test componentDidUpdate function", () => {
    const prevProps = { selectedQuestionId: "123" };
    wrapper.instance().componentDidUpdate(prevProps);
  });
});
