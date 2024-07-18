import {
	HorizontalRule,
	RangeControl,
	ToggleControl,
	TextareaControl,
} from "@wordpress/components";
import { ColorPalette } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "../block.json";

export const BottomCurveSettings = (props) => {
	return (
		<>
			<div style={{ display: "flex" }}>
				<ToggleControl
					onChange={(isChecked) => {
						props.setAttributes({
							enableCustomBottom: isChecked,
						});
					}}
					checked={props.attributes.enableCustomBottom}
				/>
				<span>{__("Use a custom SVG for bottom", metadata.textdomain)}</span>
			</div>
			{!props.attributes.enableCustomBottom &&
				(props.attributes.customBottomSvg = "")}

			{props.attributes.enableCustomBottom && (
				<TextareaControl
					label="SVG code"
					value={props.attributes.customBottomSvg ?? ""}
					onChange={(newValue) => {
						props.setAttributes({
							customBottomSvg: newValue,
						});
					}}
				/>
			)}

			<HorizontalRule />
			<RangeControl
				min={100}
				max={300}
				value={props.attributes.bottomWidth || 100}
				onChange={(newValue) => {
					props.setAttributes({
						bottomWidth: parseInt(newValue),
					});
				}}
				label={__("Width", metadata.textdomain)}
			/>
			<RangeControl
				min={0}
				max={200}
				value={props.attributes.bottomHeight}
				onChange={(newValue) => {
					props.setAttributes({
						bottomHeight: parseInt(newValue),
					});
				}}
				label={__("Height", metadata.textdomain)}
			/>
			{!props.attributes.enableCustomBottom && (
				<>
					<HorizontalRule />
					<div style={{ display: "flex" }}>
						<ToggleControl
							onChange={(isChecked) => {
								props.setAttributes({
									bottomFlipX: isChecked,
								});
							}}
							checked={props.attributes.bottomFlipX}
						/>
						<span>{__("Flip horizontally", metadata.textdomain)}</span>
					</div>
					<div style={{ display: "flex" }}>
						<ToggleControl
							onChange={(isChecked) => {
								props.setAttributes({
									bottomFlipY: isChecked,
								});
							}}
							checked={props.attributes.bottomFlipY}
						/>
						<span>{__("Flip vertically", metadata.textdomain)}</span>
					</div>
				</>
			)}
			<HorizontalRule />
			<div>
				<label>{__("Curve color", metadata.textdomain)}</label>
				<ColorPalette
					value={props.attributes.bottomColor}
					onChange={(newValue) => {
						props.setAttributes({
							bottomColor: newValue,
						});
					}}
				/>
			</div>
		</>
	);
};
