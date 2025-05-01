
const cv = document.createElement("canvas");
const ctx = cv.getContext("2d");

export default function getCssColor(cssVariableName: string) {
	if (!ctx) throw new Error("Canvas context is not available.");

	const variableValue = getComputedStyle(document.body).getPropertyValue(cssVariableName).trim();  
	ctx.fillStyle = variableValue;                                                 
	return ctx.fillStyle;     
}
