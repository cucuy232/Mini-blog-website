
import { Post, User } from '../types/blog';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: `
# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. In this guide, we'll explore how to set up a new project and start developing with these technologies.

## Setting Up Your Environment

First, you'll need to have Node.js installed on your machine. Then, you can create a new React project with TypeScript using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This command sets up a new React project with TypeScript configuration already in place.

## Understanding TypeScript in React

TypeScript adds static typing to JavaScript, which helps catch errors early in the development process. When working with React, you'll define interfaces for your props and state:

\`\`\`typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
\`\`\`

## Benefits of Using TypeScript with React

1. **Type Safety**: Catch errors at compile time instead of runtime
2. **Better IDE Support**: Enhanced autocomplete and refactoring tools
3. **Self-Documenting Code**: Types serve as documentation
4. **Improved Maintenance**: Easier to understand and refactor code

TypeScript might seem like extra work at first, but it pays dividends as your project grows in size and complexity.
    `,
    excerpt: 'Learn how to combine React with TypeScript to build more robust applications with fewer bugs.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    author: mockUsers[0],
    createdAt: '2023-05-15T10:30:00Z',
    tags: ['React', 'TypeScript', 'Frontend', 'Web Development'],
    likes: 42,
    dislikes: 3,
    readCount: 1256,
    comments: [
      {
        id: '101',
        content: 'Great introduction! I\'ve been wanting to add TypeScript to my React projects.',
        postId: '1',
        author: mockUsers[1],
        createdAt: '2023-05-15T14:25:00Z',
        likes: 5,
        dislikes: 0,
      },
      {
        id: '102',
        content: 'Do you have any recommendations for advanced TypeScript patterns with React?',
        postId: '1',
        author: mockUsers[2],
        createdAt: '2023-05-16T09:15:00Z',
        likes: 2,
        dislikes: 0,
      },
    ],
  },
  {
    id: '2',
    title: 'Mastering CSS Grid Layout',
    content: `
# Mastering CSS Grid Layout

CSS Grid Layout is a powerful tool for creating complex web layouts. In this post, we'll dive into advanced techniques and practical examples.

## Basic Grid Setup

To create a grid container:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

This creates a three-column grid with equal width columns and 20px gaps.

## Grid Areas

Grid areas allow you to create named areas in your layout:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

## Auto Placement

CSS Grid's auto-placement algorithm is incredibly powerful:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}
\`\`\`

This creates as many columns as will fit with a minimum width of 200px.

## Responsive Layouts Without Media Queries

Grid can help create responsive layouts with minimal media queries:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}
\`\`\`

This will adjust the number of columns based on available width.

CSS Grid has transformed how we build layouts for the web, making previously complex designs much simpler to implement.
    `,
    excerpt: 'Explore advanced CSS Grid techniques for creating complex, responsive layouts with less code.',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    author: mockUsers[1],
    createdAt: '2023-05-10T15:45:00Z',
    tags: ['CSS', 'Web Design', 'Frontend', 'Responsive Design'],
    likes: 38,
    dislikes: 2,
    readCount: 983,
    comments: [
      {
        id: '201',
        content: 'CSS Grid has completely changed how I approach layouts. Great article!',
        postId: '2',
        author: mockUsers[0],
        createdAt: '2023-05-11T08:32:00Z',
        likes: 7,
        dislikes: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Introduction to State Management with Redux',
    content: `
# Introduction to State Management with Redux

Redux is a popular state management library for JavaScript applications, particularly with React. Let's explore how it works and when to use it.

## Core Concepts of Redux

Redux revolves around three main principles:

1. **Single Source of Truth**: The state of your application is stored in a single object tree within a single store.
2. **State is Read-Only**: The only way to change the state is to emit an action, an object describing what happened.
3. **Changes are Made with Pure Functions**: Reducers are pure functions that take the previous state and an action, and return the next state.

## Basic Redux Setup

Here's a simple Redux setup:

\`\`\`javascript
// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

// Store
import { createStore } from 'redux';
const store = createStore(counterReducer);

// Dispatching Actions
store.dispatch(increment()); // state becomes 1
store.dispatch(increment()); // state becomes 2
store.dispatch(decrement()); // state becomes 1
\`\`\`

## When to Use Redux

Redux is beneficial for:

- Applications with a significant amount of state shared across components
- Applications where state updates are complex
- Applications with medium to large teams
- Complex UIs with multiple data sources

For simpler applications, Redux might be overkill. Consider using React's built-in state management (useState, useReducer, and Context API) for less complex scenarios.

Redux provides a robust solution for state management, but it comes with its own complexity. Carefully evaluate if your project needs Redux before adding it to your tech stack.
    `,
    excerpt: 'Learn how Redux can help manage state in complex JavaScript applications, especially when using React.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    author: mockUsers[2],
    createdAt: '2023-04-28T09:20:00Z',
    tags: ['Redux', 'React', 'State Management', 'JavaScript'],
    likes: 54,
    dislikes: 6,
    readCount: 2104,
    comments: [
      {
        id: '301',
        content: 'Redux has helped our team manage complex state much more effectively.',
        postId: '3',
        author: mockUsers[0],
        createdAt: '2023-04-29T11:45:00Z',
        likes: 4,
        dislikes: 0,
      },
      {
        id: '302',
        content: 'Have you looked at Redux Toolkit? It simplifies a lot of the boilerplate.',
        postId: '3',
        author: mockUsers[1],
        createdAt: '2023-04-30T16:22:00Z',
        likes: 8,
        dislikes: 0,
      },
      {
        id: '303',
        content: 'For smaller projects, I find React Context sufficient. But Redux definitely shines in larger applications.',
        postId: '3',
        author: mockUsers[0],
        createdAt: '2023-05-01T08:17:00Z',
        likes: 3,
        dislikes: 1,
      },
    ],
  },
];

export const currentUser: User = mockUsers[0];
