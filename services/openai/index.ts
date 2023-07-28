import useSWR from 'swr'

import httpClient from '@/lib/http-client'
import { IImageCompletion, ITextCompletion } from '@/interfaces'

const swrOptiosn = {
	// refreshInterval: 30 * 60 * 1000,
	// revalidateOnReconnect: true,
	// revalidateOnMount: true,
	// errorRetryCount: 3,
}

const urlTextCompletion = '/openai/text-completion'
const urlImageCompletion = '/openai/text-image'

export const useFetchTextCompletion = async (payload: ITextCompletion) => {
	if (!payload) return
	const creator = (url: string) =>
		httpClient.post<{ data: ITextCompletion }, string>(url, payload)

	const { data, error } = useSWR(urlTextCompletion, creator, swrOptiosn)

	return {
		data,
		error,
		isLoading: !data && !error,
	}
}

export const useFetchImageCompletion = async (payload: ITextCompletion) => {
	if (!payload) return
	const imageCreator = (url: string) =>
		httpClient.post<IImageCompletion, string>(url, payload)

	const { data, error } = useSWR(urlImageCompletion, imageCreator, swrOptiosn)

	return {
		data,
		error,
		isLoading: !data && !error,
	}
}

export const textCreator = (payload: ITextCompletion) =>
	httpClient.post<ITextCompletion, string>(urlTextCompletion, payload)

export const imageCreator = (payload: IImageCompletion) =>
	httpClient.post<IImageCompletion, string>(urlImageCompletion, payload)
