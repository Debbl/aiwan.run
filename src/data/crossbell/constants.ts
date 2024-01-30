const endpoint = "https://indexer.crossbell.io/v1";

const headers = new Headers();
// eslint-disable-next-line n/prefer-global/process
const CROSSBELL_TOKEN = process.env.CROSSBELL_TOKEN;
headers.set("Authorization", `Bearer ${CROSSBELL_TOKEN}`);

export { endpoint, headers };
