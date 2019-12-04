import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";
import { pac_dataset } from "../../components/offline_datasets.js";
import { handlePACListOpen } from "../PACList/sequences"; 

export let handleMenuListOpen = [toggle(state`MenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`MenuList.current`, props.item);
}

export let pacList = [
	handleMenuListOpen,
	handlePACListOpen,
  pacList_action
];

export function pacList_action({props, state}) {
	console.log("PAC List ->");
}

export let blockchain = [
	handleMenuListOpen,
  blockchain_action
];

export function blockchain_action(){
	console.log("Blockchain ->");
}

export let regulatorRepo = [
	handleMenuListOpen,
  regulatorRepo_action
];


export function regulatorRepo_action({props, state}){
	console.log("Regulator Repo");
}

export let trellisRepo = [
	handleMenuListOpen,
  trellisRepo_action
];

export function trellisRepo_action({props, state}){
	console.log("Trellis Repo");
}

export let offline = [
	handleMenuListOpen,
  offline_action  
];

export function offline_action({props, state}){
	console.log("Offline Demo");
	state.set(`PACList.records`, pac_dataset.records);
	state.set(`PACList.open`, true);
	state.set(`OSCList.open`, false);
}

