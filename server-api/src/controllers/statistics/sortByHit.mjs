// External imports
import path from "path";

/**
 * sortByHit - Sorts given array of logs by their request count
 *
 * @param  {[AccessLog]} logs
 */
export default function sortByHit(logs) {
  // Collect logs by their section name
  const dict = {};
  logs.forEach(log => {
    const split = log.requestPath.split("/");
    const section = path.join(log.address, split[1]);
    if (!dict[section]) {
      dict[section] = [];
    }
    dict[section].push(log);
  });

  // Remap dictinary to array of sections and hit counts, then sort it
  const items = Object.keys(dict).map(key => ({
    section: key,
    hits: dict[key].length,
    logs: dict[key]
  }));
  items.sort((a, b) => b.hits - a.hits);
  return items;
}
