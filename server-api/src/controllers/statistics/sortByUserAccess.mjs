/**
 * sortByUserAccess - Sorts given array of logs by their user
 *
 * @param  {[AccessLog]} logs
 */
export default function sortByUserAccess(logs) {
  // Collect logs by their user
  const dict = {};
  logs.forEach(log => {
    const { user } = log;
    if (!dict[user]) {
      dict[user] = [];
    }
    dict[user].push(log);
  });

  // Remap dictinary to array of users and hit counts, then sort it
  const items = Object.keys(dict).map(key => ({
    user: key,
    hits: dict[key].length,
    logs: dict[key]
  }));
  items.sort((a, b) => b.hits - a.hits);
  return items;
}
