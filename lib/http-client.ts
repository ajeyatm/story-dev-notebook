import axios, { AxiosInstance, AxiosResponse } from 'axios'

const URLs = {
	BASE_URL: '/api',
}

class HttpClient {
	BASE_URL = URLs.BASE_URL

	axiosInstance: AxiosInstance

	constructor(url = '') {
		this.BASE_URL = url || URLs.BASE_URL

		this.axiosInstance = axios.create({
			baseURL: this.BASE_URL,
		})

		// Request Interceptors
		this.axiosInstance.interceptors.request.use((config) => {
			return config
		})

		// Response Interceptors
		this.axiosInstance.interceptors.response.use(
			(response) => {
				return response.data
			},
			(error) => {
				const { response } = error

				if (
					!response ||
					this.isAuthenticationError(response) ||
					this.isAuthorisationError(response)
				) {
					console.error('Fatal error!')
				}

				return Promise.reject(error)
			}
		)
	}

	get<T>(url: string, config?: any) {
		return this.axiosInstance.get<any, T>(url, config)
	}

	post<T, R>(url: string, data?: any, config?: any) {
		return this.axiosInstance.post<T, R>(url, data, config)
	}

	put<T, R>(url: string, data?: any, config?: any) {
		return this.axiosInstance.put<T, R>(url, data, config)
	}

	patch<T, R>(url: string, data?: any, config?: any) {
		return this.axiosInstance.patch<T, R>(url, data, config)
	}

	delete<T, R>(url: string, config?: any) {
		return this.axiosInstance.delete<T, R>(url, config)
	}

	isAuthenticationError(response: AxiosResponse): boolean {
		return response.status === 401
	}

	isAuthorisationError(response: AxiosResponse): boolean {
		return response.status === 403
	}
}

const httpClient = new HttpClient(URLs.BASE_URL)

Object.freeze(httpClient)

export default httpClient
