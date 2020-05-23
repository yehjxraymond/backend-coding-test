import { expect } from "chai";
import sinon from "sinon";
import proxyquire from "proxyquire";

const appStub = {
  use: sinon.stub(),
  options: sinon.stub(),
  get: sinon.stub(),
  post: sinon.stub()
};

const app = proxyquire("./app", { express: () => appStub });

describe("app", () => {
  it("setup the routes", async () => {
    app.default();
    expect(appStub.get.calledWith("/health")).equal(true);
    expect(appStub.get.calledWith("/rides")).equal(true);
    expect(appStub.get.calledWith("/rides/:id")).equal(true);
    expect(appStub.post.calledWith("/rides")).equal(true);
    expect(appStub.options.calledWith("*")).equal(true);
  });
});
