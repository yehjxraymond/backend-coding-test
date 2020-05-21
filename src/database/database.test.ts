import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon, { stub, SinonStubbedInstance } from "sinon";
import { initializeDb, all, run } from "./database";
import { db } from "./instance";
import { CREATE_TABLE_QUERY } from "./queries";

use(chaiAsPromised);

describe("database", () => {
  let stubDb: SinonStubbedInstance<typeof db>;
  before(() => {
    stubDb = stub(db);
  });
  after(() => {
    sinon.restore();
  });
  beforeEach(() => {
    stubDb.all.reset();
    stubDb.run.reset();
    stubDb.serialize.reset();
  });

  describe("all", () => {
    it("resolves on successful execution", async () => {
      stubDb.all.yields(null, ["res1", "res2"]);
      const res = await all("QUERY", ["foo", "bar"]);
      expect(res).deep.equal(["res1", "res2"]);
      expect(stubDb.all.args[0][0]).equal("QUERY");
      expect(stubDb.all.args[0][1]).deep.equal(["foo", "bar"]);
    });

    it("rejects on error", async () => {
      stubDb.all.yields(new Error("Kaboom"));
      const res = all("QUERY", ["foo", "bar"]);
      await expect(res).rejected;
      expect(stubDb.all.args[0][0]).equal("QUERY");
      expect(stubDb.all.args[0][1]).deep.equal(["foo", "bar"]);
    });
  });

  describe("run", () => {
    it("resolves on successful execution", async () => {
      stubDb.run.yields();
      const res = await run("QUERY", ["foo", "bar"]);
      expect(res).deep.equal(undefined);
      expect(stubDb.run.args[0][0]).equal("QUERY");
      expect(stubDb.run.args[0][1]).deep.equal(["foo", "bar"]);
    });

    it("rejects on error", async () => {
      stubDb.run.yields(new Error("Kaboom"));
      const res = run("QUERY", ["foo", "bar"]);
      await expect(res).rejected;
      expect(stubDb.run.args[0][0]).equal("QUERY");
      expect(stubDb.run.args[0][1]).deep.equal(["foo", "bar"]);
    });
  });

  describe("initializeDb", () => {
    it("should serialize and setup the db", async () => {
      stubDb.serialize.yields();
      stubDb.run.yields();
      await initializeDb();
      expect(stubDb.serialize.called).equal(true);
      expect(stubDb.run.args[0][0]).equal(CREATE_TABLE_QUERY);
    });
  });
});
