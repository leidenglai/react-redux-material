export const fetchDashboardData = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve([21, 22, 34, 55]);
    }, 1000)
  });
}