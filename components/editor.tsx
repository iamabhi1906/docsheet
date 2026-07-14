import { useEffect, useRef } from "react";
import {
  LinkBubbleMenu,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import useExtensions from "./useExtensions";
import EditorMenuControls from "./EditorMenuControls";

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
        content={content} // Initial content
        onUpdate={({ editor }) => {
          const html = editor.getHTML();
          onChange(html);
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          variant: "standard",
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>
    </>
  );
}
