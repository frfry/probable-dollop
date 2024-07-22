import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
import "./editor.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ImageThumbnail } from "../../components/imageThumbnail";
import { useImage } from "../../hooks/useImage";
config.autoAddCss = false;

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const imgSelected = !!props.attributes.imageId && !!image?.source_url;

	return (
		<>
			<div {...blockProps}>
				{!!imgSelected && <ImageThumbnail imageId={props.attributes.imageId} />}
				{!imgSelected && (
					<div
						style={{
							display: "flex",
							height: 150,
							width: "100%",
							background: "white",
						}}
					>
						<FontAwesomeIcon icon={faPanorama} style={{ margin: "auto" }} />
					</div>
				)}

				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						render={({ open }) => {
							return (
								<button className="media-select" onClick={open}>
									{imgSelected ? "Replace Image" : "Select an Image"}
								</button>
							);
						}}
						value={props.attributes.imageId}
						onSelect={(item) => {
							props.setAttributes({
								imageId: item.id,
							});
						}}
					/>
				</MediaUploadCheck>
			</div>
		</>
	);
}
