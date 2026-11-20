// One ES module with everything Study Spellbook (the learner notebook) uses
// from TipTap 3.32.1 (MIT). Built by `npm run build`; see package.json.
// Pages import it as
//   import { Editor, StarterKit, ... } from '/assets/vendor/tiptap-notebook-3.32.1.bundle.js';
// Kept apart from Grading Grimoire's bundle so changes here can't affect it.
export { Editor, Node, Mark, Extension, mergeAttributes, generateHTML } from '@tiptap/core';
export { default as StarterKit } from '@tiptap/starter-kit';
export { TableKit } from '@tiptap/extension-table';
export { default as Image } from '@tiptap/extension-image';
export { default as Subscript } from '@tiptap/extension-subscript';
export { default as Superscript } from '@tiptap/extension-superscript';
export { default as Highlight } from '@tiptap/extension-highlight';
export { TextStyle, Color, FontSize } from '@tiptap/extension-text-style';
export { TaskList, TaskItem } from '@tiptap/extension-list';
export { Placeholder, CharacterCount } from '@tiptap/extensions';
export { Plugin, PluginKey } from '@tiptap/pm/state';
