# Your First Web Page with HTML and Vim

Before you touch a framework, a package manager, or a build tool, you should know what's actually happening under the hood. Every website you've ever visited is HTML. That's it. Everything else is built on top of it.

In this tutorial you'll create an HTML file from scratch using Vim, a text editor that runs in your terminal. No downloads, no installs, no IDE. Just you and the command line.

## Open your terminal

On macOS, open Terminal from Applications > Utilities, or hit Cmd + Space and type "Terminal".

On Linux, you probably already know where it is.

## Create a folder for your project

```bash
mkdir ~/my-first-site
cd ~/my-first-site
```

## Create an HTML file with Vim

```bash
vim index.html
```

You are now inside Vim. It has two main modes:

- **Normal mode** is for navigating and running commands. This is what you start in.
- **Insert mode** is for typing text.

Press `i` to enter insert mode. You'll see `-- INSERT --` at the bottom of the screen.

Type the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>I made this with Vim.</p>
  </body>
</html>
```

Now save and quit:

1. Press `Esc` to go back to normal mode
2. Type `:wq` and press Enter

That's `:w` to write (save) and `:q` to quit.

## Open it in your browser

On macOS:

```bash
open index.html
```

On Linux:

```bash
xdg-open index.html
```

You should see a page with "Hello, world!" and a paragraph underneath. That's a real web page. No server, no JavaScript, no build step.

## Edit the file

Let's add to it. Open it back up:

```bash
vim index.html
```

In normal mode, you can navigate with these keys:

- `h` left, `j` down, `k` up, `l` right
- `w` jump forward a word
- `b` jump back a word
- `gg` go to the top of the file
- `G` go to the bottom

Move your cursor to the line after the `<p>` tag. Press `o` to open a new line below and enter insert mode. Add a list:

```html
    <h2>Things I want to learn</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
```

Press `Esc`, then type `:wq` to save and quit. Open the file again in your browser to see your changes.

## What you just learned

- HTML is the structure of every web page
- `<h1>`, `<p>`, `<ul>`, `<li>` are some of the basic building blocks
- Vim is a terminal text editor with normal mode and insert mode
- You can create and edit files without ever leaving the command line

## Vim cheat sheet

| Key | Mode | What it does |
|-----|------|-------------|
| `i` | Normal | Enter insert mode at cursor |
| `o` | Normal | Open new line below, enter insert mode |
| `Esc` | Insert | Back to normal mode |
| `:w` | Normal | Save |
| `:q` | Normal | Quit |
| `:wq` | Normal | Save and quit |
| `dd` | Normal | Delete a line |
| `u` | Normal | Undo |
| `hjkl` | Normal | Navigate left, down, up, right |

Next up: [Intro to Node.js, local development, and JavaScript functions](../functions/)
