import { expect } from "chai";
import sinon, { stub, SinonStub } from "sinon";
import createHttpError from "http-errors";
import { logger } from "../../logger";
import { handlerBoundary } from "./handlerBoundary";

describe("handlerBoundary", () => {
  let loggerStub: SinonStub<any>;
  const mockRes = {
    status: stub(),
    send: stub()
  } as any;
  const mockReq: any = () => {};
  const mockNext = () => {};
  before(() => {
    loggerStub = stub(logger, "error");
  });
  after(() => {
    sinon.restore();
  });
  beforeEach(() => {
    mockRes.send.reset();
    mockRes.status.reset();
    loggerStub.reset();
  });

  it("should send successfully resolved results", async () => {
    const successFn = async () => "foobar";
    await handlerBoundary(successFn)(mockReq, mockRes, mockNext);
    expect(mockRes.send.args[0]).deep.equal(["foobar"]);
  });

  it("should send successfully resolved results for functions that returns void results", async () => {
    const successFn = async () => {};
    await handlerBoundary(successFn)(mockReq, mockRes, mockNext);
    expect(mockRes.send.args[0]).deep.equal([]);
  });

  it("should log non-expected errors", async () => {
    const successFn = async () => {
      throw new Error("Kaboom");
    };
    await handlerBoundary(successFn)(mockReq, mockRes, mockNext);
    expect(mockRes.send.args[0]).deep.equal([
      {
        error_code: "SERVER_ERROR"
      }
    ]);
    expect(mockRes.status.args[0]).deep.equal([500]);
    expect(loggerStub.args[0][0].name).equal("Error");
  });

  it("should log expected errors to be exposed", async () => {
    const successFn = async () => {
      throw createHttpError(400, "Kaboom", { error_code: "FOO_BAR" });
    };
    await handlerBoundary(successFn)(mockReq, mockRes, mockNext);
    expect(mockRes.send.args[0]).deep.equal([
      {
        error_code: "FOO_BAR",
        message: "Kaboom"
      }
    ]);
    expect(mockRes.status.args[0]).deep.equal([400]);
    expect(loggerStub.args[0][0].name).equal("BadRequestError");
  });

  it("should log expected errors to be hidden", async () => {
    const successFn = async () => {
      throw createHttpError(400, "Super Secret Message", { error_code: "FOO_BAR", expose: false });
    };
    await handlerBoundary(successFn)(mockReq, mockRes, mockNext);
    expect(mockRes.send.args[0]).deep.equal([
      {
        error_code: "SERVER_ERROR"
      }
    ]);
    expect(mockRes.status.args[0]).deep.equal([400]);
    expect(loggerStub.args[0][0].name).equal("BadRequestError");
  });
});
