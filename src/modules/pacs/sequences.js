/* pacs/sequences.js */
import { sequence }     from "cerebral";
import { set, when }    from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise          from "bluebird";
import oada             from "@oada/cerebral-module/sequences";

let _localPath = "/bookmarks/regulatorpacs";

let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    regulatorpacs: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const CONNECTION_ID = "pacs.connection_id";

function buildFetchRequestNoWatch({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetchNoWatch = sequence("pacs.fetchNoWatch", [
  buildFetchRequestNoWatch,
	oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.regulatorpacs`),
  {
		true: sequence("fetchPacsSuccess", [
            mapOadaToPacs,
            set(state`pacs.emptyDataSet`, false),
          ]),
    false: sequence("fetchPacsEmptySetNoWatch", [
            set(state`pacs.emptyDataSet`, true),
           ])
  }
]);

export const refresh = sequence("pacs.refresh", [
	set(state`pacs.loading`, true),
	fetchNoWatch,
	set(state`pacs.loading`, false),
]);

export const handleWatchUpdate = sequence("pacs.handleWatchUpdate", [
  () => {console.log("--> pacs.handleWatchUpdate");},
	refresh
]);

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree,
       watch:         { signals: ["pacs.handleWatchUpdate"] }
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("pacs.fetch", [
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.regulatorpacs`),
	{
		true: sequence("fetchPACsSuccess", [
            mapOadaToPacs,
			      set(state`PACList.emptyDataSet`, false),
		      ]),
    false: sequence("fetchPACsEmptySet", [
			      set(state`PACList.emptyDataSet`, true)
		       ]),
	}
]);

export const init = sequence("pacs.init", [
	when(state`Connections.connection_id`),
	{
    true: [oada.connect],
		false: [
			      oada.connect,
			      set(state`pacs.connection_id`, props`connection_id`),
            set(state`Connections.connection_id`, props`connection_id`),
			     ]
	},
	set(state`pacs.loading`, true),
	fetch,
	set(state`pacs.loading`, false),
	set(state`PACList.open`, true)
]);

export function mapOadaToPacs({ props, state }){
  let connection_id = state.get(CONNECTION_ID);
	let pacs = state.get(`oada.${connection_id}.bookmarks.regulatorpacs`);
  if (pacs) {
    return Promise.map(Object.keys(pacs || {}), pac => {
			if (pac[0] !== "_" && pac !== "pacs") {
				let currentPAC = 
					  state.get(`oada.${connection_id}.bookmarks.regulatorpacs.${pac}`);
				if ( currentPAC && currentPAC.id ) {
					let pacListItem = { visible: false, verified: false };
					state.set(`pacs.records.${pac}`, pacs[pac]);
					state.set(`PACList.records.${pac}`, pacListItem);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToPacs

export const updatePAC = sequence("pacs.updatePAC", [
  createPAC,
  buildPACRequest,
  oada.put
]);

function createPAC({props, state}){
  let id = state.get('PACList.current');
	let pacs = [];
	if (id !== "none") {
    let pac = state.get(`pacs.records.${id}`);
		pacs.push(pac);
	}
	return {pacs: pacs};
}

function buildPACRequest({ props, state }) {
	let connection_id = state.get(CONNECTION_ID);
	let requests = [];
  if (props.pacs[0]) {
		let pac = props.pacs[0];
    let request = {
			connection_id: connection_id,
			data:          props.pacs[0],
			path:          `${_localPath}/${pac.id}`,
			tree:          tree
		};
		requests.add(request);
	}
	return {
		connection_id: connection_id,
		requests:      requests,
		domain:        state.get("oada_domain")
	}
}
