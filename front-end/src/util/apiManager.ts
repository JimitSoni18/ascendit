class APIManager {
	private static instance: APIManager;

	private constructor() {}

	public static getInstance(): APIManager {
		if (!APIManager.instance) {
			APIManager.instance = new APIManager();
		}
		return APIManager.instance;
	}

	// public async getData(url: string): Promise<any> {}
}
