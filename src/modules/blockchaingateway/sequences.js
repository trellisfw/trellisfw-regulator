import BKGatewayService from "./blockchaingatewayservice";

export function connectToBlockchainGateway({props, state}) {
  console.log("Connecting to Blockchain Gateway");
}

export async function queryAll({props, state}) {
  const pacRes = await BKGatewayService.queryAll();
	console.log("--> response --> ", pacRes);
}

export async function readPAC({props, state}) {
	let pacId = state.get(`PACList.current`);
	console.log("-->pacID before blockchain ", pacId);
	let _request = {"pacId": pacId};
  const pacRes = await BKGatewayService.readPAC(_request);
	console.log("--> response --> ", pacRes);
	return { pac: pacRes.data };
}

export async function getPAC({props, state}) {
	let pacId = state.get(`PACList.current`);
	console.log("-->pacID before blockchain ", pacId);
	let _request = {"pacId": pacId};
  const pacRes = await BKGatewayService.getPAC(_request);
	console.log("--> response --> ", pacRes);
	return { pac: pacRes.data };
}
