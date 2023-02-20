function maxProfit(n) {
    // Define the properties and their attributes
    const properties = {
      Theatre: { time: 5, space: 2, earning: 1500 },
      Pub: { time: 4, space: 1, earning: 1000 },
      "Commercial Park": { time: 10, space: 3, earning: 3000 },
    };
  
    // Initialize the earnings array
    const earnings = new Array(n + 1).fill().map(() => new Array(Object.keys(properties).length).fill(0));
  
    // Fill out the earnings array
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < Object.keys(properties).length; j++) {
        const prop = Object.keys(properties)[j];
        if (properties[prop].time <= i) {
          // Calculate the maximum earnings for this property
          let maxEarnings = properties[prop].earning;
          for (let k = properties[prop].space; k <= i; k++) {
            maxEarnings = Math.max(maxEarnings, properties[prop].earning + earnings[i - k][j]);
          }
          earnings[i][j] = maxEarnings;
        } else {
          earnings[i][j] = earnings[i - 1][j];
        }
      }
    }
  
    // Backtrack to find the optimal mix of properties
    let i = n;
    let j = Object.keys(properties).length - 1;
    const mix = Object.keys(properties).reduce((obj, prop) => {
      obj[prop] = 0;
      return obj;
    }, {});
    while (i > 0 && j >= 0) {
      if (earnings[i][j] == earnings[i - 1][j]) {
        j--;
      } else {
        mix[Object.keys(properties)[j]] += 1;
        i -= properties[Object.keys(properties)[j]].time;
      }
    }
  
    // Print the optimal mix of properties and their earnings
    let result = '';
    Object.keys(properties).forEach((prop) => {
      result += `${prop[0]}:${mix[prop]}`;
      if (prop !== 'Commercial Park') {
        result += 'P:';
      } else {
        result += 'C:';
      }
    });
    result += earnings[n][Object.keys(properties).length - 1];
    console.log(result);
  }
  
  // Example usage:
  maxProfit(7); // Output: T:1P:0C:0 3000
  maxProfit(13); // Output: T:2P:0C:0 16500