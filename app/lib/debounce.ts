type DebounceFunc<T extends any[]> = (...args: T) => void

const debounce = <T extends any[]>(
	func: DebounceFunc<T>,
	wait: number,
): ((...args: T) => void) => {
	let timeout: NodeJS.Timeout | null
	return function executedFunction(...args: T) {
		const later = () => {
			clearTimeout(timeout!)
			func(...args)
		}
		clearTimeout(timeout!)
		timeout = setTimeout(later, wait)
	}
}

export default debounce
