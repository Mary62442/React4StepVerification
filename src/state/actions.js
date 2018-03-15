export const addCredentialCaptain = (stepName, credentials) => {
	return {type: "ADD-CREDENTIAL-CAPTAIN", stepName:stepName, entityCredentials: credentials}
};

export const addCredentialGeneral = (stepName, credentials) => {
	return {type: "ADD-CREDENTIAL-GENERAL", stepName:stepName, entityCredentials: credentials}
};

export const addCredentialPresident = (stepName, credentials) => {
	return {type: "ADD-CREDENTIAL-PRESIDENT", stepName:stepName, entityCredentials: credentials}
};


/* export const increment = (delta) => ({  
	type: "INCREMENT",
	howMuch:delta 
});
  
export const decrement = (delta) => ({  
	type: "DECREMENT",
	howLess:delta 
});
  
export const write = (newitem) => {
	return {type: "WRITE",newItem: newitem}
};

export const acquire = (newitem) => {
	return {type: "ACQUIRE",newItem: newitem}
};
  
export const erase = (newitem) => {
	return {type: "ERASE",itemToRemove: newitem }
}; */