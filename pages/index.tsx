import Notebooks from '@/components/notebooks'

const Index = () => {
	return (
		<>
			<Notebooks />
		</>
	)
}

/* Retrieves Notebook(s) data from mongodb database */
// export async function getServerSideProps(): Promise<{
// 	props: {
// 		notebooks: Notebook[]
// 	}
// }> {
// 	await dbConnect()

// 	/* find all the data in our database */
// 	const result = (await Notebook.find({})) as unknown as { data: Notebook[] }

// 	return { props: { notebooks: result?.data ?? [] } }
// }

export default Index
