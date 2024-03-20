export type TestInfo = {
	_id: string,
	title: string,
	rating: number,
	creator: {
		_id: string,
		email: string,
	}
}

export type TestList = TestInfo[];
