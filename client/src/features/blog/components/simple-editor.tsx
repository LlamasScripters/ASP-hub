import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export interface SimpleEditorProps {
	value: string;
	onChange: (value: string) => void;
}

export function SimpleEditor({ value, onChange }: SimpleEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Typography,
			Image,
			TaskList,
			TaskItem,
		],
		content: value || "",
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"prose min-h-[200px] max-w-none border rounded-md p-3 bg-background focus:outline-none",
			},
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "", false);
		}
	}, [editor, value]);

	if (!editor) {
		return (
			<div className="min-h-[200px] border rounded-md p-3 bg-muted animate-pulse">
				Chargement de l'éditeur...
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="border-b mb-2 pb-2 flex gap-1 flex-wrap">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("bold") ? "bg-blue-100 text-blue-700 font-bold" : ""
					}`}
				>
					B
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("italic") ? "bg-blue-100 text-blue-700 italic" : ""
					}`}
				>
					I
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("strike")
							? "bg-blue-100 text-blue-700 line-through"
							: ""
					}`}
				>
					S
				</button>
				<div className="w-px bg-gray-300 mx-2" />
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("bulletList") ? "bg-blue-100 text-blue-700" : ""
					}`}
				>
					• Liste
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("orderedList") ? "bg-blue-100 text-blue-700" : ""
					}`}
				>
					1. Liste
				</button>
				<div className="w-px bg-gray-300 mx-2" />
				<button
					type="button"
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
						editor.isActive("paragraph") ? "bg-blue-100 text-blue-700" : ""
					}`}
				>
					P
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 font-bold ${
						editor.isActive("heading", { level: 1 })
							? "bg-blue-100 text-blue-700"
							: ""
					}`}
				>
					H1
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 font-semibold ${
						editor.isActive("heading", { level: 2 })
							? "bg-blue-100 text-blue-700"
							: ""
					}`}
				>
					H2
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 font-medium ${
						editor.isActive("heading", { level: 3 })
							? "bg-blue-100 text-blue-700"
							: ""
					}`}
				>
					H3
				</button>
				<div className="w-px bg-gray-300 mx-2" />
				<button
					type="button"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					↺
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					↻
				</button>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}
