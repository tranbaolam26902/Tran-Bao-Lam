/** Solution 1: Using loop */
const sumWithLoop = (n) => {
  let result = 0;

  for (let i = 0; i <= n; i++) {
    result += i;
  }

  return result;
};

/** Solution 2: Using the recursion */
const sumWithRecursion = (n) => {
  if (n < 1) return 0;

  return n === 1 ? 1 : n + sumWithRecursion(n - 1);
};

/** Solution 3: Using Carl Friedrich Gauss’s formula */
const sumWithFormula = (n) => {
  if (n < 0) return 0;

  return (n * (n + 1)) / 2;
};

/**
 * Measuring the execution time of a function
 * @param {string} name - The name to identify where the function is called from
 * @param {string} context - Context to call the function
 * @param {string} cb - Function to be measured
 */
const calculateExecuteTime = async (name, context, cb) => {
  const start = process.hrtime();
  const result = await cb.call(context);
  const stop = process.hrtime(start);
  const executeTime = (stop[0] * 1e9 + stop[1]) / 1e9;
  console.log(`${name} execution time: ${executeTime}s`);
  return result;
};

////////////////////////// Results //////////////////////////
// Uncomment these lines one by one for more accurate results

//calculateExecuteTime("solution 1:", this, () => sumWithLoop(10));
//calculateExecuteTime("solution 2:", this, () => sumWithRecursion(10));
//calculateExecuteTime("solution 3:", this, () => sumWithFormula(10));

//calculateExecuteTime("solution 1:", this, () => sumWithLoop(7868));
//calculateExecuteTime("solution 2:", this, () => sumWithRecursion(7868));
//calculateExecuteTime("solution 3:", this, () => sumWithFormula(7868));

//calculateExecuteTime("solution 1:", this, () => sumWithLoop(2500000));
////calculateExecuteTime("solution 2:", this, () => sumWithRecursion(2500000)); // Maximum call stack size
//calculateExecuteTime("solution 3:", this, () => sumWithFormula(2500000));

//calculateExecuteTime("solution 1:", this, () => sumWithLoop(50000000));
////calculateExecuteTime("solution 2:", this, () => sumWithRecursion(50000000)); // Maximum call stack size
//calculateExecuteTime("solution 3:", this, () => sumWithFormula(50000000));
