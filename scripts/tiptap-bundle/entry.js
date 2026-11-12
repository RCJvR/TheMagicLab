// One ES module with everything Grading Grimoire uses from TipTap 3.32.1 (MIT).
// Built by `npm run build`; see package.json. Pages import it as
//   import { Editor, StarterKit, ... } from '/assets/vendor/tiptap-3.32.1.bundle.js';
export { Editor, Node, Mark, Extension, mergeAttributes } from '@tiptap/core';
export { default as StarterKit } from '@tiptap/starter-kit';
export { TableKit } from '@tiptap/extension-table';
export { default as Image } from '@tiptap/extension-image';
export { default as UniqueID } from '@tiptap/extension-unique-id';
export { default as Subscript } from '@tiptap/extension-subscript';
export { default as Superscript } from '@tiptap/extension-superscript';
export { CharacterCount, Placeholder } from '@tiptap/extensions';
export { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
export { Decoration, DecorationSet } from '@tiptap/pm/view';
