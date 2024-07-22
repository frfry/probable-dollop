import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./editor.scss";
import { useSelect } from "@wordpress/data";
import { ImageThumbnail } from "../../components/imageThumbnail";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "gallery-inner-blocks",
		},
		{ allowedBlocks: ["kylee-new-blocks/gallery-img"] },
	);
	const [editMode, setEditMode] = useState(true);

	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");
			const block = getBlocksByClientId(props.clientId)?.[0];
			return block?.innerBlocks;
		},
		[props.clientId],
	);
	const [previewModeImage, setPreviewModeImage] = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId,
	});
	return (
		<>
			<div {...blockProps}>
				{!!editMode && (
					<div className="edit-mode">
						<span className="gallery-label">Gallery</span>
						<div {...innerBlocksProps} />
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => (
								<ImageThumbnail
									key={innerBlock.clientId}
									imageId={innerBlock.attributes.imageId}
									height={75}
									onClick={() => {
										setPreviewModeImage({
											imageId: innerBlock.attributes.imageId,
											blockId: innerBlock.clientId,
										});
									}}
									className={`thumb ${
										innerBlock.clientId === previewModeImage.blockId
											? "selected"
											: ""
									}`}
								/>
							))}
						</div>
						<div>
							<ImageThumbnail
								imageId={previewModeImage?.imageId}
								height="initial"
							/>
						</div>
					</>
				)}
			</div>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={editMode ? "Preview gallery" : "Edit gallery"}
						onClick={() => {
							setEditMode((prevState) => !prevState);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}