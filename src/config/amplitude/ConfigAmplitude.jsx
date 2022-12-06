import amplitude from "amplitude-js";

export const initAmplitude = () => {
  let apiKey = "9749c329402163c2e98049957e12c692";

  if (
    window.location.hostname !== "www.snacks.com" &&
    window.location.hostname !== "shop.tastyrewards.com"
  ) {
    apiKey = "74ac99526969099b848435efc291cd55";
  }
  amplitude.getInstance().init(
    apiKey,
    null,
    {
      includeUtm: true,
      includeReferrer: true,
    },
    function () {
      console.info("init complete");
    }
  );
};

export const setAmplitudeUserId = (userId) => {
  amplitude.getInstance().setUserId(userId);
};

export const regenerateAmplitudeDeviceId = () => {
  amplitude.getInstance().regenerateDeviceId();
};

export const setCustomUserId = (userId) => {
  let identify = new amplitude.Identify().set("User ID", userId);
  amplitude.getInstance().identify(identify);
};

export const setAmplitudeUserProperties = (properties) => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};

export const logRevenueData = (productId, price, qty) => {
  let revenue = new amplitude.Revenue()
    .setProductId(productId)
    .setPrice(price)
    .setQuantity(qty);
  amplitude.getInstance().logRevenueV2(revenue);
};
