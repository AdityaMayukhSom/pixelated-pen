---
title: "Tridant Of Poseidon At Rescue"
published-on: "2024-08-11"
---

# Working with MDX in NuxtJS

```js showLineNumbers
class Complex {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
```

There’s a ton about Next.js and React that I didn’t fully know heading into this, so it took me a bit to get up to speed on a few concepts. I’m reiterating them here for my own memory and reference, but at the same time, I want to help others who might be in a similar spot. There’s no shortage of advice and posts out there, but none felt like they explained things in a helpful way for me.

## Hola, Amiga

Okay, so here’s a few things I needed to learn or remind myself heading into this project.

- Ok, Files or folders with brackets in their names like [slug] or [slug].js are dynamic route segments. These allow you to group files and folders of related content while generating routes for your content. In short, you can render any number of MDX pages using this page as a template.

- There’s also a special catch-all version of dynamic routes that works across nested folders by prefacing your dynamic segment with .... In my case with the Pierre docs, `app/src/docs/[...slug]/page.tsx` is the dynamic segment that allows us to render any docs [MDX page](https://mdxjs.com/docs/using-mdx/#props), no matter the subfolder.

```java {4} showLineNumbers
public class Solution {
    public boolean canBeEqual(int[] target, int[] arr) {
        Map<Integer, Integer> mp = new HashMap<>();

        for(int idx = 0, cnt = 0; idx < arr.length; ++idx) {
            if(arr[idx] == target[idx]) continue;

            cnt = mp.getOrDefault(arr[idx], 0);
            if(cnt == -1) mp.remove(arr[idx]);
            else mp.put(arr[idx], cnt + 1);

            cnt = mp.getOrDefault(target[idx], 0);
            if(cnt == 1) mp.remove(target[idx]);
            else mp.put(target[idx], cnt - 1);
        }

        return mp.isEmpty();
    }
}
```

```js showLineNumbers
class Dimention {
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export default Dimention;
```

```html showLineNumbers
<script>
  console.log("hello world");
</script>
```

- The generateStaticParams function works with dynamic routes to generate each static page. This function is used within those dynamic segments, and when it’s told where to look for say a bunch of MDX files in our `app/src/docs/content/` directory, it will loop over those to statically generate each page. Neat!

| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |

## Footnote

A note[^1]

[^1]: Big note.

## Table

| a    | b    | c    | d    |
| ---- | ---- | ---- | ---- |
| helo | wolo | lolo | jolo |

## Tasklist

- [ ] to do
- [x] done

> The future belongs to those who believe in the beauty of their dreams.
