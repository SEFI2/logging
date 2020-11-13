// External imports
import expect from "expect.js";

// Internal imports
import sortByUserAccess from "./sortByUserAccess.mjs";

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

describe("sortByUserAccess", function callback() {
  it("should be all for one user", function callback() {
    const logs = populateArray(defaultLog, 10);
    const sorted = sortByUserAccess(logs);
    expect(sorted.length).to.eql(1);
    expect(sorted[0].user).to.eql("kadyr");
    expect(sorted[0].hits).to.eql(10);
    expect(sorted[0].logs).to.eql(logs);
  });

  it("should be 2 users", function callback() {
    const logs = populateArray(defaultLog, 10);
    logs.forEach((log, index) => {
      if (index % 2 === 0) {
        log.user = "kadyr";
      } else {
        log.user = "beka";
      }
    });
    const sorted = sortByUserAccess(logs);
    expect(sorted.length).to.eql(2);
    expect(sorted[0].hits).to.eql(5);
    expect(sorted[1].hits).to.eql(5);
  });

  it("should be 3 users", function callback() {
    const logs = populateArray(defaultLog, 100);
    logs.forEach((log, index) => {
      if (index < 10) {
        log.user = "kadyr";
      } else if (index >= 10 && index < 30) {
        log.user = "beka";
      } else {
        log.user = "kola";
      }
    });
    const sorted = sortByUserAccess(logs);
    expect(sorted.length).to.eql(3);
    expect(sorted[0].hits).to.eql(70);
    expect(sorted[1].hits).to.eql(20);
    expect(sorted[2].hits).to.eql(10);

    expect(sorted[0].user).to.eql("kola");
    expect(sorted[1].user).to.eql("beka");
    expect(sorted[2].user).to.eql("kadyr");
  });
});
