// External imports
import expect from "expect.js";

// Internal imports
import sortByHit from "./sortByHit.mjs";

/**
 * Populate copy of objects
 *
 * @param  {Object} value
 * @param  {Number} times
 */
function populateArray(value, times) {
  const arr = [];
  for (let i = 0; i < times; ++i) {
    arr.push(JSON.parse(JSON.stringify(value)));
  }
  return arr;
}

// Default log
const defaultLog = {
  rawLog: "",
  address: "www.google.com",
  user: "kadyr",
  requestTime: Date(),
  requestType: "GET",
  requestPath: "/api",
  httpVersion: "HTTP",
  statusCode: 200,
  requestSize: 100,
  created: Date()
};

describe("sortByHit", function callback() {
  it("should be all in one section", function callback() {
    const logs = populateArray(defaultLog, 10);
    const sorted = sortByHit(logs);
    expect(sorted.length).to.eql(1);
    expect(sorted[0].section).to.eql("www.google.com/api");
    expect(sorted[0].hits).to.eql(10);
    expect(sorted[0].logs).to.eql(logs);
  });

  it("should be in two section", function callback() {
    const logs = populateArray(defaultLog, 10);
    logs.forEach((log, index) => {
      if (index % 2 === 0) {
        log.requestPath = "/first-section";
      } else {
        log.requestPath = "/second-section";
      }
    });
    const sorted = sortByHit(logs);
    expect(sorted.length).to.eql(2);
    expect(sorted[0].hits).to.eql(5);
    expect(sorted[1].hits).to.eql(5);
  });

  it("should be in 3 sections", function callback() {
    const logs = populateArray(defaultLog, 100);
    logs.forEach((log, index) => {
      if (index < 10) {
        log.requestPath = "/first-section";
      } else if (index >= 10 && index < 30) {
        log.requestPath = "/second-section";
      } else {
        log.requestPath = "/third-section";
      }
    });
    const sorted = sortByHit(logs);
    expect(sorted.length).to.eql(3);
    expect(sorted[0].hits).to.eql(70);
    expect(sorted[1].hits).to.eql(20);
    expect(sorted[2].hits).to.eql(10);

    expect(sorted[0].section).to.eql("www.google.com/third-section");
    expect(sorted[1].section).to.eql("www.google.com/second-section");
    expect(sorted[2].section).to.eql("www.google.com/first-section");
  });
});
