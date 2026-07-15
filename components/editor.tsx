import { useEffect, useRef } from "react";
import { RichTextEditor, type RichTextEditorRef } from "mui-tiptap";
import useExtensions from "./use-extensions";
import EditorMenuControls from "./editor-menu-controls";
import styles from "./editor.module.css";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  useEffect(() => {
    const editor = rteRef.current?.editor;
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  return (
    <>
      <RichTextEditor
        ref={rteRef}
        extensions={extensions}
        content={content}
        immediatelyRender
        editorProps={{
          handlePaste(view, event) {
            const items = event.clipboardData?.items;
            if (!items) return false;

            for (const item of items) {
              if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (!file) continue;

                const reader = new FileReader();

                reader.onload = () => {
                  const src = reader.result as string;

                  const node = view.state.schema.nodes.image.create({
                    src,
                  });

                  const tr = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(tr);
                };

                reader.readAsDataURL(file);

                return true;
              }
            }

            return false;
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          variant: "standard",
        }}
        className={styles.textArea}
      />
    </>
  );
}
