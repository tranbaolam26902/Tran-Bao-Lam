# Problem 3: Messy React

## List of computational inefficiencies and anti-patterns

### 1. Unnecessary FormattedWalletBalance interface

The `formatted` property of `FormattedWalletBalance` can be added to `WalletBalance` as an optional property. In usage, we can assign a default value for the `formatted` property or access it with optional chaining.

Refactored code:

```typescript
interface WalletBalance {
	currency: string;
	amount: number;
	formatted?: string;
}
// Remove the FormattedWalletBalance interface
```

### 2. Unnecessary `children` prop

The `children` prop in the `WalletPage` component should be removed because never used.

Refactored code:

```typescript
const WalletPage: React.FC<Props> = (props: Props) => {
	const { ...rest } = props;
	// ...
}
```

### 3. Unexpected `any` type and duplicate returned values in the `getPriority` function

The type of `blockchain` parameter in the `getPriority` function is `any`, which should not be used in TypeScript. Based on the `switch` statement inside the function, the `blockchain`’s type should be `string`.

The `Zilliqua` and `Neo` cases have the same returned value so one `return` statement is enough for both cases.

Refactored code :

```typescript
const getPriority = (blockchain: string): number => {
	switch (blockchain) {
		case 'Osmosis':
			return 100;
		case 'Ethereum':
			return 50;
		case 'Arbitrum':
			return 30;
		case 'Zilliqua':
		case 'Neo':
			return 20;
		default:
			return -99;
	}
}
```

### 4. `sortedBalances` issues

The callback function In the `balances.filter` method:
- Property `blockchain` does not exist on type `WalletBalance`.
- The Wrong variable is used in the first `if` statement. It should be `balancePriority`, not `lhsPriority`.
- The logic of the second `if` statement should be wrong. The result of this filter method should be an array of balances with a **positive** amount and priority greater than **-99**.
- Two `if` statements can be merged into one.
- It can also be rewritten in tertiary operator.

In the `balances.sort` method, `compareFn` should return a number to match the `sortedBalances` function’s return type. But in the provided code, the case of 2 elements having the same priority is missing. So that it can return `undefined` and mismatch the return type of the `sortedBalances` function.

The `prices` in the useMemo dependencies array should be removed.

Refactored code:

```typescript
interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string; // Added
	formatted?: string;
}

const sortedBalances = useMemo(() => {
	return balances
		.filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0 ? true : false)
		.sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances]);
```

### 5. Render wrong WalletRows

The code to render WalletRow uses the wrong balances. It should be `formattedBalances`, not `sortedBalances`. The type of `balance` parameter in the callback function of the `map` method should be `WalletBalance` instead of `FormattedWalletBalance`.

```typescript
const rows = formattedBalances.map((balance: WalletBalance, index: number) => {
	const usdValue = prices[balance.currency] * balance.amount;
	return (
		<WalletRow
			className={classes.row}
			key={index}
			amount={balance.amount}
			usdValue={usdValue}
			formattedAmount={balance.formatted}
		/>
	);
});
```

## Final code after refactored

```typescript
interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string;
	formatted?: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
	const { ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();
	
	const getPriority = (blockchain: string): number => {
		switch (blockchain) {
			case 'Osmosis':
				return 100;
			case 'Ethereum':
				return 50;
			case 'Arbitrum':
				return 30;
			case 'Zilliqa':
			case 'Neo':
				return 20;
			default:
				return -99;
		}
	};
	
	const sortedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0 ? true : false)
			.sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
	}, [balances]);
	
	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed()
		};
	});
	
	const rows = formattedBalances.map((balance: WalletBalance, index: number) => {
		const usdValue = prices[balance.currency] * balance.amount;
			return (
				<WalletRow
					className={classes.row}
					key={index}
					amount={balance.amount}
					usdValue={usdValue}
					formattedAmount={balance.formatted}
				/>
			);
	});
	
	return <div {...rest}>{rows}</div>;
};
```
