import checkTraffic from "./checkTraffic.mjs";
import moment from "moment";
import expect from "expect.js";

describe("checkTraffic", function callback() {
  it("should be 10", function callback() {
    const now = moment.utc();
    const startTime = now.format();
    const endTime = now.add(10, "seconds").format();
    const logs = [...Array(100).keys()];
    const traffic = checkTraffic(logs.length, startTime, endTime);
    expect(traffic).to.eql(10);
  });

  it("should be 1", function callback() {
    const now = moment.utc();
    const startTime = now.format();
    const endTime = now.add(100, "seconds").format();
    const logs = [...Array(100).keys()];
    const traffic = checkTraffic(logs.length, startTime, endTime);
    expect(traffic).to.eql(1);
  });
});
