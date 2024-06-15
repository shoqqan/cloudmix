import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const convertTimestampToTime = (timestamp: number): string => {
	const date = new Date(timestamp * 1000) // Умножаем на 1000, чтобы получить миллисекунды
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const formattedHours = hours.toString().padStart(2, "0")
	const formattedMinutes = minutes.toString().padStart(2, "0")
	return `${formattedHours}:${formattedMinutes}`
}
