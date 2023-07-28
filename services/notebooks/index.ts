import useSWR from 'swr'

import httpClient from '@/lib/http-client'
import { INotebook } from '@/interfaces'

const swrOptiosn = {
	refreshInterval: 30 * 60 * 1000,
	revalidateOnReconnect: true,
	revalidateOnMount: true,
	errorRetryCount: 3,
}

const urlNotebooks = '/notebooks'

export function useFetchNoteBooks() {
	const fetcher = (url: string) => httpClient.get<{ data: INotebook[] }>(url)

	const { data, error } = useSWR(urlNotebooks, fetcher, swrOptiosn)

	return {
		data: data?.data,
		error,
		isLoading: !data && !error,
	}
}
export const useCreateNoteBook = async (payload: Partial<INotebook>) => {
	if (!payload) return
	const creator = (url: string) =>
		httpClient.post<Partial<{ data: INotebook }>, unknown>(url, payload)

	const { data, error } = useSWR(urlNotebooks, creator, swrOptiosn)

	return {
		data,
		error,
		isLoading: !data && !error,
	}
}

export const notBookCreator = (payload: Partial<INotebook>) =>
	httpClient.post<Partial<{ data: INotebook }>, unknown>(urlNotebooks, payload)

export const useUpdateNoteBook = async (
	id: string,
	payload: Partial<INotebook>
) => {
	if (!id || !payload) return
	const updator = (url: string) =>
		httpClient.put<Partial<{ data: INotebook }>, unknown>(url, payload)

	const { data, error } = useSWR(`${urlNotebooks}/${id}`, updator, swrOptiosn)

	return {
		data,
		error,
		isLoading: !data && !error,
	}
}

export const useDeleteNoteBook = async (id: string) => {
	if (!id) return
	const remover = (url: string) => httpClient.delete(url)

	const { data, error } = useSWR(`${urlNotebooks}/${id}`, remover, swrOptiosn)

	return {
		data,
		error,
		isLoading: !data && !error,
	}
}
