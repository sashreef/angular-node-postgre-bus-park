import { InjectionToken } from "@angular/core";

export type FixedPositionFunction
	= (rect: ClientRect, anchorRect: ClientRect, rootSize: { height: number; width: number }) => CSSStyleDeclaration;

export const POSITION_FUNCTION = new InjectionToken("PositionFunction");

export function normalFixedPosition(rect: ClientRect, anchorRect: ClientRect, rootSize: { height: number; width: number }) {
	const r = Math.round;
	const style = {
		bottom: undefined,
		left: undefined,
		maxHeight: undefined,
		right: undefined,
		top: undefined,
	} as Partial<CSSStyleDeclaration>;

	// horizontal positioning
	if (rect.width <= anchorRect.width) {
		style.left = `${anchorRect.left}px`;
		style.right = `${rootSize.width - anchorRect.right}px`;
	} else {
		if (r(anchorRect.left) + r(rect.width) > rootSize.width
			&& r(anchorRect.left) > rootSize.width - r(anchorRect.right))
			style.right = `${rootSize.width - r(anchorRect.right)}px`;
		else
			style.left = `${anchorRect.left}px`;
	}

	// vertical positioning
	if (r(anchorRect.bottom) - 1 + r(rect.height) > rootSize.height
		&& r(anchorRect.top) > rootSize.height - r(anchorRect.bottom)) {
		style.bottom = `${rootSize.height - anchorRect.top - 1}px`;
		style.maxHeight = `${anchorRect.top + 1}px`;
	} else {
		style.top = `${anchorRect.bottom - 1}px`;
		style.maxHeight = `${rootSize.height - anchorRect.bottom + 1}px`;
	}

	return style;
}

export function rightAlignFixedPosition(rect: ClientRect, anchorRect: ClientRect, rootSize: { height: number; width: number }) {
	const r = Math.round;
	const style = {
		bottom: undefined,
		left: undefined,
		maxHeight: undefined,
		right: undefined,
		top: undefined,
	} as Partial<CSSStyleDeclaration>;

	// horizontal positioning
	if (rect.width <= anchorRect.width) {
		style.right = `${rootSize.width - anchorRect.right}px`;
	} else {
		if (r(anchorRect.left) + r(rect.width) > rootSize.width
			&& r(anchorRect.left) > rootSize.width - r(anchorRect.right))
			style.right = `${rootSize.width - r(anchorRect.right)}px`;
		else
			style.left = `${anchorRect.left}px`;
	}

	// vertical positioning
	if (r(anchorRect.bottom) - 1 + r(rect.height) > rootSize.height
		&& r(anchorRect.top) > rootSize.height - r(anchorRect.bottom)) {
		style.bottom = `${rootSize.height - anchorRect.top - 1}px`;
		style.maxHeight = `${anchorRect.top + 1}px`;
	} else {
		style.top = `${anchorRect.bottom - 1}px`;
		style.maxHeight = `${rootSize.height - anchorRect.bottom + 1}px`;
	}

	return style;
}