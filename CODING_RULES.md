# AI Agent Coding Rules for Educational HTML Projects

## Core Principles
- **Forward Control**: HTML calls JavaScript functions directly via `onclick`, `onload`, `onkeypress`
- **Ultra-Minimal**: Keep code extremely short and readable for kids
- **No Error Handling**: Remove try/catch blocks completely
- **Clean Structure**: Each sub-project stays in its own directory

## HTML Structure Rules

### Required Template:
```html
<!DOCTYPE html>
<html data-theme="dark">
<head>
    <title>App Name 🔥</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.0/dist/full.min.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
</head>
<body onload="initApp(); particlesJS('background', {particles:{number:{value:100}, color:{value:'#fff'}, opacity:{value:0.5}, size:{value:3}, line_linked:{enable:false}, move:{enable:true, speed:1, direction:'bottom'}}})">
    <div id="background" class="hero min-h-screen bg-neutral">
        <div class="hero-content">
            <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
                <div class="card-body text-center space-y-3">
                    <h1 class="text-2xl font-bold text-center">App Title</h1>
                    <!-- UI elements here -->
                </div>
            </div>
        </div>
    </div>
    <div id="toastContainer" class="toast toast-center toast-top"></div>
    <script src="app.js"></script>
</body>
</html>
```

### UI Element Rules:
- **Simple IDs**: `id="city"` not `id="cityInput"`
- **One-line inputs**: `<input id="name" type="text" placeholder="Enter name" class="input input-bordered w-full" onkeypress="if(event.key==='Enter') doSomething()"/>`
- **Clean buttons**: `<button onclick="doSomething()" class="btn btn-primary">Do It!</button>`
- **Interactive elements**: `hover:bg-base-300 hover:scale-105 transition-all duration-200` with `style="cursor: pointer;"`
- **Headers**: `<h1 class="text-2xl font-bold text-center">App Title</h1>` (centered, large, bold)
- **Forward control**: Always use `onclick`, `onload`, `onkeypress` in HTML

## JavaScript Rules

### Function Structure:
```javascript
async function doSomething() {
    const input = document.getElementById('input').value;
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    // Show loading
    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    // Do the work
    const response = await fetch('some-api');
    const data = await response.text();

    // Show result
    result.innerHTML = `<div class="bg-gray-700 p-4 rounded-lg text-white">${data}</div>`;

    // Reset button
    button.innerHTML = 'Do It!';
    button.disabled = false;
}
```

### JavaScript Don'ts:
- ❌ No try/catch blocks
- ❌ No complex error handling
- ❌ No event listeners in JS
- ❌ No DOMContentLoaded
- ❌ No console.log statements
- ❌ No comments or documentation

### JavaScript Do's:
- ✅ Use async/await for API calls
- ✅ Direct DOM manipulation
- ✅ Simple variable names
- ✅ One function per action
- ✅ Show loading states on buttons

## Visual Design Rules

### DaisyUI Components Only:
- **Cards**: `card w-full max-w-md bg-base-100 shadow-2xl border border-base-300` (responsive: w-full max-w-md)
- **Inputs**: `input input-bordered w-full`
- **Buttons**: `btn btn-primary btn-sm` (compact: btn-sm)
- **Results**: `bg-base-200` (use DaisyUI base colors)
- **Loading**: `loading loading-spinner loading-sm` (compact: loading-sm)
- **Notifications**: `alert alert-success` with `toast toast-center toast-top`

### Background Effects:
- Always use particles.js snow effect
- Dark theme: `data-theme="dark"`
- Neutral background: `bg-neutral`

### Typography Rules:
- **Main headers**: `text-2xl font-bold text-center` (large, bold, centered)
- **Sub headers**: `text-xl font-semibold text-center` (medium, semi-bold, centered)
- **Body text**: `text-base` (default size)
- **Small text**: `text-sm` (compact)
- **All headers must be centered**: Always use `text-center` class

### Icons:
- Use local animated SVG icons when available
- Place in `project-name/icons/` directory
- Size: 80px for results, 32px for small elements
- No emojis in code - replace with SVG icons

## File Organization

### Each Project Directory:
```
html-files/project-name/
├── index.html
├── app.js
└── icons/ (if needed)
    ├── icon1.svg
    └── icon2.svg
```

### Naming Convention:
- **Projects**: `weather`, `pokemon`, `cat-pics` (lowercase, hyphenated)
- **Functions**: `getWeather()`, `getPokemon()` (camelCase, descriptive)
- **IDs**: `city`, `result`, `name` (short, friendly)

## API Integration Rules

### Simple Fetch Pattern:
```javascript
const response = await fetch('api-url');
const data = await response.text(); // or .json()
```

### Result Display:
```javascript
result.innerHTML = `<img src="icons/${icon}" width="80"/><div class="bg-base-200 p-4 rounded-lg mt-4">${data}</div>`;
```

### Notification Pattern:
```javascript
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'alert alert-success';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}
```

## Quality Checklist

Before completing any project, verify:
- [ ] HTML uses forward control (onclick, onload)
- [ ] No try/catch blocks anywhere
- [ ] All IDs are short and friendly
- [ ] DaisyUI components used throughout
- [ ] Particles.js snow effect working
- [ ] Loading states on buttons
- [ ] No console.log or comments
- [ ] App works in single directory
- [ ] Total lines: HTML < 30, JS < 25
- [ ] Main header is centered and prominent (`text-2xl font-bold text-center`)
- [ ] All headers use `text-center` class

## Forbidden Patterns

### Never Use:
- `document.addEventListener`
- `try { } catch { }`
- `console.log()`
- Complex class names like `justify-center text-center`
- External dependencies beyond DaisyUI and particles.js
- Multiple files per project (except icons)
- Detailed error messages
- Complex animations or transitions

### Always Use:
- `onload="function()"`
- `onclick="function()"`
- `async/await`
- Simple DOM manipulation
- DaisyUI classes
- Local SVG icons
- Single-line HTML elements