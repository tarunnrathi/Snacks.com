import oktaconfig from "./oktaconfig";
describe("Okta config file", () => {
  it("test onSessionExpired function", () => {
    const mock = jest.spyOn(oktaconfig.oidc, "onSessionExpired");
    oktaconfig.oidc.onSessionExpired();
    expect(mock).toBeCalled();
  });
});
