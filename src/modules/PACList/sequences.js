import { state }  from "cerebral/tags";
import { toggle } from "cerebral/operators";
import _          from "lodash";
import crypto     from "crypto";
import { getPAC } from "../blockchaingateway/sequences";

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
	console.log("--> computed hash [" + _computedHash + "]");
  return (pacHash === _computedHash); 
}

export let verifySignature = [
  getPAC,
	verifySignatureAction
]

export function verifySignatureAction({props, state}) {
	console.log("--> props ", props);
	let id    = state.get(`PACList.current`);
	let _pac  = state.get(`pacs.records.${id}`);
	//console.log("--> pac", _pac);

	let _hash = _pac.pac_hash ? _pac.pac_hash.value: "";
	if (_pac.trust_level === "tl3" && typeof props.pac.pacHash !== 'undefined') {
		//TODO: need to implement the cache version of this
		//let _cached_block_pac = state.get(`blockchaingateway.records.${id}`);
		state.set(`blockchaingateway.records.${id}`, props.pac);
    _hash = props.pac.pacHash;
	}
  console.log("--> verifying signature PAC[" + id + "]");
	console.log("--> pac hash [" + _hash + "]");
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
