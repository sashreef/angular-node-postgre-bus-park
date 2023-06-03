
export type ListItem = [any, string];

export class TemplateUtil {
	public static getMap(templateElement: HTMLElement, templateId?: string): Map<any, any> {
		const dts = getDescriptionTerms(templateElement, templateId);
		return Array.from(dts).reduce((p, c): Map<any, any> => {
			const dd = c.nextElementSibling as HTMLElement;
			if (!dd || dd.tagName !== "DD") {
				throw new Error("Bad template.");
			}
			return p.set(getElementValue(c), getElementValue(dd));
		}, new Map<any, any>());
	}
}

function getDescriptionTerms(templateElement: HTMLElement, templateId?: string): NodeListOf<HTMLElement> {
	const dl = templateId
		? templateElement.querySelector(`dl#${templateId}`)!
		: templateElement.querySelector("dl ")!;
	return dl.querySelectorAll("dt");
}

function getElementValue(element: HTMLElement): any {
	if (element.hasAttribute("json")) {
		return JSON.parse(element.innerText.trim());
	}
	return element.innerText.trim() === "null" ? null : element.innerText.trim();
}