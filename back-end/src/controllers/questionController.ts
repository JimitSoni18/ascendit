import Question, { IQuestion } from "src/models/questionModel";

export async function createQuestionsReturningIds(questions: IQuestion[]) {
	const createdArray = await Question.insertMany(questions);

	const n = createdArray.length;
	const createdIds = new Array(n);

	for (let i = 0; i < n; i++) {
		createdIds[i] = createdArray[i]._id;
	}

	return createdIds;
}
