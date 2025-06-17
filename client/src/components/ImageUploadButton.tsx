import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadButtonProps {
	currentImage?: string;
	className?: string;
	userId: string;
	onUploadSuccess: (file: File) => void;
	onUploadError?: (error?: Error) => void;
	disabled?: boolean;
	isUploading?: boolean;
	imgPreviewClassName?: string;
	isErrorUpload?: boolean;
}

const defaultRootClassName =
	"relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors";

const defaultImgPreviewClassName = "w-16 h-16 rounded-full object-cover";

export function ImageUploadButton({
	currentImage,
	className,
	onUploadSuccess,
	onUploadError,
	disabled = false,
	isUploading = false,
	isErrorUpload = false,
	imgPreviewClassName,
}: ImageUploadButtonProps) {
	const [imagePreview, setImagePreview] = useState<string | undefined>();

	const rootRef = useRef<HTMLDivElement>(null);

	const isDisabled = disabled || isUploading;

	const { getRootProps, getInputProps, isDragActive, isFileDialogActive } =
		useDropzone({
			onDropAccepted: (acceptedFiles) => {
				const file = acceptedFiles.at(0);
				if (!file) return;

				setImagePreview(URL.createObjectURL(file));
				onUploadSuccess(file);
			},
			onDropRejected: () => {
				onUploadError?.(
					new Error(
						"Veuillez sélectionner une image valide (png, jpg, jpeg, gif, webp)",
					),
				);
			},
			accept: {
				"image/png": [".png"],
				"image/jpeg": [".jpg", ".jpeg"],
				"image/gif": [".gif"],
				"image/webp": [".webp"],
			},
			maxFiles: 1,
			disabled: isDisabled,
		});

	const isUploadingImage = isUploading || isFileDialogActive || isDragActive;

	return (
		<div
			ref={rootRef}
			{...getRootProps({
				className: cn(
					defaultRootClassName,
					isDragActive
						? "border-primary bg-primary/5"
						: "border-muted-foreground/25 hover:border-primary/50",
					isErrorUpload && "border-destructive hover:border-destructive/50",
					className,
				),
			})}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center justify-center text-center">
				{imagePreview || currentImage ? (
					<img
						src={imagePreview ?? currentImage}
						alt="Profile preview"
						className={cn(defaultImgPreviewClassName, imgPreviewClassName)}
					/>
				) : (
					<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
				)}
				<p className="text-sm text-muted-foreground">
					{isUploadingImage
						? "Téléchargement..."
						: isDragActive
							? "Déposez l'image ici..."
							: "Glissez-déposez une image ou cliquez pour sélectionner"}
				</p>
			</div>
		</div>
	);
}
