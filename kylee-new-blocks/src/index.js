import {
	registerFormatType,
	applyFormat,
	removeFormat,
} from "@wordpress/rich-text";
import { RichTextToolbarButton, ColorPalette } from "@wordpress/block-editor";
import "./style.scss";
import { useState } from "@wordpress/element";
import { Popover, PanelBody } from "@wordpress/components";
import lowHighlightIcon from "./assets/low-highlight-active.svg";
import lowHighlightActive from "./assets/low-highlight.svg";

registerFormatType("kylee-new-blocks/low-highlight", {
	title: "Low Highlight",
	tagName: "span",
	className: "kylee-new-blocks-low-highlight",
	edit: ({ onChange, value, contentRef, isActive }) => {
		const [showColors, setShowColors] = useState(false);
		const lowHighlight = value.activeFormats?.find(
			(format) => format.type === "kylee-new-blocks/low-highlight",
		);
		const attributes = {
			...(lowHighlight?.attributes || {}),
			...(lowHighlight?.unregisteredAttributes || {}),
		};
		return (
			<>
				<RichTextToolbarButton
					title="Low Highlight"
					icon={
						<img
							height={24}
							width={24}
							src={isActive ? lowHighlightActive : lowHighlightIcon}
						/>
					}
					onClick={() => {
						setShowColors(true);
					}}
				/>
				{!!showColors && (
					<Popover
						anchor={contentRef?.current}
						onClose={() => {
							setShowColors(false);
						}}
					>
						<PanelBody>
							<ColorPalette
								value={attributes?.["data-color"]}
								onChange={(newValue) => {
									if (newValue) {
										onChange(
											applyFormat(value, {
												type: "kylee-new-blocks/low-highlight",
												attributes: {
													"data-color": newValue,
													style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`,
												},
											}),
										);
									} else {
										onChange(
											removeFormat(value, "kylee-new-blocks/low-highlight"),
										);
									}
								}}
							/>
						</PanelBody>
					</Popover>
				)}
			</>
		);
	},
});
