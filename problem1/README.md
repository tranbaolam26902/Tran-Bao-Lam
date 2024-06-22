# Problem 1: Three ways to sum to n

## Solution 1: Using loop

```javascript
const sumWithLoop = (n) => {
    let result = 0;

    for (let i = 0; i <= n; i++) {
        result += i;
    }

    return result;
};
```

## Solution 2: Using the recursion

```javascript
const sumWithRecursion = (n) => {
    if (n < 1) return 0;

    return n === 1 ? 1 : n + sumWithRecursion(n - 1);
}
```

## Solution 3: Using Carl Friedrich Gauss’s formula

```javascript
const sumWithFormula = (n) => {
    if (n < 0) return 0;

    return (n * (n + 1)) / 2;
}
```

## Conclusion

This is the result after a few attempts to measure the execution time of these solutions:
- All solutions have the same execution time if the value of `n` is small.
- When the value of `n` is greater than around **7868** (on my computer), Solution 2 reaches maximum call stack size.
- Solution 1 runs faster than Solution 3 when the value of `n` is smaller than **2500000**.
- Solution 3 has a stable execution time in all cases (around 0.00003s).
These solutions are not the best, but in my opinion, I will choose Solution 3 for most cases.
