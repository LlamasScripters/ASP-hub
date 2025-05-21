import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadButtonProps {
	onImageUpload: (url: string) => void;
	currentImage?: string | null;
	className?: string;
}

export function ImageUploadButton({
	onImageUpload,
	currentImage,
	className,
}: ImageUploadButtonProps) {
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (!file) return;

			setIsUploading(true);
			try {
				// TODO: Implement actual file upload to your storage service
				// For now, we'll create a local URL
				const url = URL.createObjectURL(file);
				onImageUpload(url);
			} catch (error) {
				console.error("Error uploading image:", error);
			} finally {
				setIsUploading(false);
			}
		},
		[onImageUpload],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif"],
		},
		maxFiles: 1,
		disabled: isUploading,
	});

	return (
		<div
			{...getRootProps()}
			className={cn(
				"relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
				isDragActive
					? "border-primary bg-primary/5"
					: "border-muted-foreground/25 hover:border-primary/50",
				className,
			)}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center justify-center text-center">
				{currentImage ? (
					<img
						src={currentImage}
						alt="Profile preview"
						className="w-16 h-16 rounded-full object-cover"
					/>
				) : (
					<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
				)}
				<p className="text-sm text-muted-foreground">
					{isUploading
						? "Téléchargement..."
						: isDragActive
							? "Déposez l'image ici..."
							: "Glissez-déposez une image ou cliquez pour sélectionner"}
				</p>
			</div>
		</div>
	);
}
