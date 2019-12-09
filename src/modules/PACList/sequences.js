import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";
import { SHA256 } from "crypto-js";

export let handlePACListOpen = [toggle(state`PACList.open`)];

export function setCurrentItem({props, state}) {
  if(props.id)
    state.set(`PACList.current`, props.id);
}

export function verifySignature({props, state}) {
	let id = state.get(`PACList.current`);
	let title = state.get(`pacs.records.${id}.title`);
  console.log(" --> verifying signature " + id);
	console.log(SHA256(title));
}
