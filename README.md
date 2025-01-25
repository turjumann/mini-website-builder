## About This Project

This is a **Mini Website Builder**—a straightforward tool designed to help users create web pages quickly and efficiently. It’s built for simplicity and practicality, allowing you to construct pages using a drag-and-drop interface without needing to write code. Whether you’re a beginner or someone looking for a lightweight solution, this tool is here to make the process smooth and hassle-free.

### Key Features

- **Drag-and-Drop Functionality**: Pre-made sections like headers, hero areas, and footers can be dragged and dropped into the preview area to build your page.  
- **Live Preview**: As you add or modify sections, the preview updates in real-time, so you can see exactly how your page will look.  
- **Import/Export**: Save your design as a JSON file, **not only to your computer but also to your localstorage** ,to export it for later use or share it with others. You can also import saved designs to continue editing.  
- **Editable Sections**: Customize sections by editing properties like titles, descriptions, and image URLs. You can also delete or reorder sections to refine your layout.  

### Purpose

This project is designed for:  
- **Beginners** who want to create web pages without coding.  
- **Developers** who need a quick and simple prototyping tool.  
- **Anyone** looking for an efficient way to build and customize web pages.  

It’s a practical, no-frills solution for creating web pages with ease, offering just the right balance of simplicity and functionality.

## Tools & Libraries Used

The project is built using the following main tools and libraries:

- **Drag-and-Drop**: [`@dnd-kit/core`](https://dndkit.com/) for implementing the drag-and-drop functionality.  
- **UI Components**: [`shadcn`](https://ui.shadcn.com/) and [`@radix-ui`](https://www.radix-ui.com/) for building accessible and customizable UI components.  
- **Styling**: [`tailwind-css`](https://tailwindcss.com/) for utility-first CSS styling.  
- **Theming**: [`next-themes`](https://github.com/pacocoursey/next-themes) for handling light/dark mode themes.  
- **Validation**: [`zod`](https://zod.dev/) for schema validation.  
- **Form Management**: [`react-hook-form`](https://react-hook-form.com/) for managing form state and inputs efficiently.  

These tools were chosen to ensure a modern, efficient, and maintainable development experience while delivering a smooth user experience.

## Why I Used @dnd-kit/core

I chose [`@dnd-kit/core`] for the drag-and-drop functionality because it’s lightweight, performant, and highly customizable. It’s built specifically for React, making it easy to integrate, and it supports features like smooth animations, keyboard accessibility, and multi-device compatibility. Unlike the HTML5 Drag-and-Drop API, it’s consistent across browsers and devices, and its modular design allowed me to implement advanced features like reordering and editable sections without unnecessary complexity. Overall, it was the perfect fit for creating a seamless drag-and-drop experience in the Mini Website Builder.

## To run this project locally

```bash
# First, make sure to install all deps & libs
npm install

# Second, run
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
