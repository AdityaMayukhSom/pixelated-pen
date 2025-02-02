<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

// import { h, useSlots } from "vue";

// const slots = useSlots();
//
// based on the https://github.com/wcoder/highlightjs-line-numbers.js by @wcoder
// https://github.com/wcoder/highlightjs-line-numbers.js/issues/19#issuecomment-335563484
// https://stackoverflow.com/questions/74049920/how-to-get-a-change-of-prop-of-useslot-in-vue-3
// https://zelig880.com/how-to-fix-slot-invoked-outside-of-the-render-function-in-vue-3
// const render = () => {
//   const vn = h(
//     "code",
//     {
//       ...slots.default({})[0].children[0].props,
//       class: props.class + " pre-tag-code-examples",
//     },
//     slots.default({})[0].children[0]
//   );

//   return vn;
// };

import hljs from "highlight.js";

function getLines(text: string) {
  if (text.length === 0) {
    return [];
  }
  const lines = text.split(/\r\n|\r|\n/g);
  // If the last line contains only carriage return, remove it
  if (lines[lines.length - 1].trim() === "") {
    lines.pop();
  }
  return lines;
}

console.log(props.code);

const lines = getLines(props.code).map((line) => {
  return hljs.highlight(line, { language: props.language });
});
</script>

<template>
  <!-- {{ highlightedCode.code }} -->
  <pre
    :class="`p-3 mb-5 rounded-sm leading-none *:selection:bg-emerald-200 *:selection:text-emerald-900 overflow-hidden ${props.class}`"
  ><code class="hljs [*:not(.hljs)]:text-yellow-400 [&:not(.hljs)]:text-yellow-400 line-number:content-[attr(data-line-number)] line-number:inline-block line-number:w-5 line-number:mr-4 line-number:text-right line-number:text-gray-500 line-number:leading-none font-consolas-only *:leading-0 *:font-consolas-only"><span v-for="(line, lineNumber) in lines" v-html="line.value" :data-line-number="lineNumber + 1" class="code-line line w-full block"></span></code></pre>
</template>

<style scoped></style>
