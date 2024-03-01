interface IMetadataNoBody {
	query?: { [key: string]: string };
	headers?: { [key: string]: string };
}

interface IMetadataWBody extends IMetadataNoBody {
	body?: object;
}

class APIManager {
	BASE_URL: string;
	private static instance: APIManager;

	private constructor() {
		this.BASE_URL = process.env.BASE_URL as string;
	}

	public static getInstance(): APIManager {
		if (!APIManager.instance) {
			APIManager.instance = new APIManager();
		}
		return APIManager.instance;
	}

	private validateUrl(url: string) {
		if (!url.startsWith("/")) {
			throw new Error("URL segment must be prefixed with a `/`");
		}
	}

	private generateQuery(query: { [key: string]: string }) {
		let queryString = "";
		for (const key in query) {
			queryString += `&${key}=${query[key]}`;
		}
		return queryString;
	}

	public async get(url: string, config: IMetadataNoBody) {
		this.validateUrl(url);
		const headers = config.headers || {};
		return await fetch(`${this.BASE_URL}${url}`, {
			headers,
		}).then((data) => data.json());
	}

	public async post(url: string, config: IMetadataWBody) {
		this.validateUrl(url);
		const query = config.query ? this.generateQuery(config.query) : "";
		const options: any = {
			method: "POST",
		};
		if (config.body) {
			options.body = JSON.stringify(config.body);
		}
		return await fetch(`${this.BASE_URL}${url}${query}`, options).then((res) =>
			res.json(),
		);
	}

	public async delete(url: string, config: IMetadataNoBody) {
		this.validateUrl(url);
		const headers = config.headers || {};
		return await fetch(`${this.BASE_URL}${url}`, {
			headers,
			method: "DELETE",
		}).then((data) => data.json());
	}
}
