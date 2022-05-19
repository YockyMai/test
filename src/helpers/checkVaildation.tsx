export const checkValidation = (phoneValue: string, nameValue: string) => {
	if (phoneValue.length > 6 && nameValue.length > 0) {
		return true;
	} else if (phoneValue.length !== 11) return false;
	else return false;
};
