import toast from 'react-hot-toast'

export const showToast = (message: string) => {
	toast(message, {
		duration: 2000,
		position: 'bottom-right',
		style: {
			background: '#333',
			color: '#fff',
		},
	})
}

export const showErrorToast = (message: string) => {
	toast.error(message, {
		duration: 2000,
		position: 'top-right',
		style: {
			background: '#ff4d4d',
			color: '#fff',
		},
	})
}

export const showWarningToast = (message: string) => {
	toast(message, {
		duration: 2000,
		position: 'bottom-right',
		icon: '⚠️',
		style: {
			background: '#ffa500',
			color: '#fff',
		},
	})
}
