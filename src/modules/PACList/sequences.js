import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";
//import { sha256 } from "js-sha256";
import _ from "lodash";
import crypto from "crypto";
import { readPAC } from "../blockchaingateway/sequences";

export let handlePACListOpen = [toggle(state`PACList.open`)];

export function setCurrentItem({props, state}) {
  if (props.id) {
    state.set(`PACList.current`, props.id);
	}
}

function cleanObject(obj) {
    Object.keys(obj).forEach(e => {
         if (e[0] === '_' || e === "pac_hash") {
           delete obj[e];
         }
    });

  return obj;
}

function verifyHash(pacHash, cleanPAC) {
	let _computedHash = crypto.createHash("sha256").update(cleanPAC).digest("hex");
	console.log(_computedHash);
  return (pacHash === _computedHash); 
}

export let verifySignature = [
  readPAC,
	verifySignatureAction
]

export function verifySignatureAction({props, state}) {
	//console.log("--> props ", props);
	let id = state.get(`PACList.current`);
	let _pac = state.get(`pacs.records.${id}`);
	let _hash = _pac.pac_hash.value;
	// TODO: need to compare against blockchain value for tl3
	// I do have the pac from the ledger, so comparing is easy
  console.log(" --> verifying signature PAC[" + id + "]");
	console.log("--> pac hash");
	console.log(_hash);
	let _cleanPAC = cleanObject(_.cloneDeep(_pac));
	if (verifyHash(_hash, _cleanPAC)) {
		state.set(`Info.hash`, _hash);
    state.set(`Info.open`, true);
		state.set("PACList.detailOpen", false);
	}
}

export function handlePACContentOpen({props, state}) {
  let pacid = state.get(`PACList.current`);
  // visible or pacContentOpen
  let pacContentOpen = state.get(`PACList.records.${pacid}.visible`);
  if (typeof pacContentOpen !== 'undefined') {
    state.set(`PACList.records.${pacid}.visible`, ! pacContentOpen);
  }
}
