# React Component Design Kata

A small, deliberately imperfect React + TypeScript application for a group refactoring exercise.

## Goal

Refactor the code while preserving behavior. The point is **not** to arrive at one canonical architecture. The goal is to discuss component design decisions and make those decisions explicit.

The kata is designed to surface:

1. What React is trying to solve
2. One-way data flow
3. State ownership and locality
4. Component seams / render boundaries
5. Smart vs. dumb (container vs. presentation) components

## Start

```bash
npm install
npm test
npm run dev
```

## Exercise

Start by reading `src/UserDashboard.tsx` without changing it.

As a group, ask:

- What responsibilities does this component have?
- Which values are actual state, and which are derived?
- Who needs to know each piece of state?
- Where does data enter the component tree?
- Which components could become useful render boundaries?
- What should be passed down versus owned locally?
- Which responsibilities are domain/data concerns versus presentation concerns?
- Would you create a custom hook? Why or why not?

### Suggested constraint

Do not add a state-management library. Do not change the product behavior. Keep the exercise focused on React component design.

### Important

There is intentionally no single "correct" final solution. A good refactor should make the responsibilities, data flow, and state ownership easier to understand without creating unnecessary abstraction.

The tests describe behavior, not architecture.
