<link rel="stylesheet" href="style.css" />

# ERIC'S NOTES

### for repo: base-lamp-no-wp

<br>

<a id="top-bookmark-btn" class="bookmark-link" href="#bookmark">JUMP TO BOOKMARK</a>


### Git add all files except some pattern

To add all files to your Git staging area except those starting with "mobile" and ending with ".png," you can use the following command in your terminal:

```bash
git add -- ':!mobile*.png'
```

Here's a breakdown of what's happening:

- `git add -- ':!mobile*.png'`: The `--` separates paths from options, and `':!pattern'` is used to exclude files matching the given pattern from being staged. In this case, it excludes files that start with "mobile" and end with ".png".

If you need to add other specific patterns, you can chain additional `git add` commands like so:

```bash
git add .
git reset mobile*.png
```

This will first add all files and then remove the specified files from the staging area.

Let me know if you have any other questions about this!

(Source: https://chatgpt.com/c/5e133a65-6dc8-4465-85ee-51f77726bc64)



---

<a id="bookmark" href="#top-bookmark-btn" title="back to top">BOOKMARK</a>
---