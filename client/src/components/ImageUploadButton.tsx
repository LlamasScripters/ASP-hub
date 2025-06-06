import { usersService } from "@/features/users/users.service.js";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadButtonProps {
	onImageUpload: (url: string) => void;
	currentImage?: string | null;
	className?: string;
	userId: string;
}

export function ImageUploadButton({
	onImageUpload,
	currentImage,
	className,
	userId,
}: ImageUploadButtonProps) {
	const uploadMutation = useMutation({
		mutationFn: (file: File) => usersService.uploadUserAvatar(userId, file),
		onSuccess: (imageUrl) => {
			onImageUpload(imageUrl);
		},
		onError: (error) => {
			console.error("Error uploading image:", error);
		},
	});

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (!file) return;

			uploadMutation.mutate(file);
		},
		[uploadMutation],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropAccepted: (acceptedFiles) => {
			console.log(acceptedFiles);
		},
		onDropRejected: (rejectedFiles) => {
			console.log(rejectedFiles);
		},
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
		},
		maxFiles: 1,
		disabled: uploadMutation.isPending,
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
					{uploadMutation.isPending
						? "Téléchargement..."
						: isDragActive
							? "Déposez l'image ici..."
							: "Glissez-déposez une image ou cliquez pour sélectionner"}
				</p>
			</div>
		</div>
	);
}
