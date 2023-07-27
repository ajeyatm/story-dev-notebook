import useSWR from 'swr'

import httpClient from '@/lib/http-client'
import { INotebook } from '@/interfaces'

export function useFetchNoteBooks() {
	const url = '/notebooks'
	const configFetcher = (url: string) =>
		httpClient.get<{ data: INotebook[] }>(url)

	const { data, error } = useSWR(url, configFetcher)

	return {
		data: data?.data,
		error,
		isLoading: !data && !error,
	}
}
// export const createBanner = async (data: Partial<IBannerRecord>) => {
// 	await httpClient.post<Partial<IBannerRecord>, unknown>(BANNERS, data)
// }

// export const updateBanner = async (data: Partial<IBannerRecord>) => {
// 	await httpClient.put<Partial<IBannerRecord>, unknown>(
// 		`${BANNERS}/${data._id}`,
// 		data
// 	)
// }

// export const deleteBanner = async (id: string) => {
// 	await httpClient.delete(`${BANNERS}/${id}`)
// }
