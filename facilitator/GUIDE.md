# Facilitator Guide

## Recommended format: 45–60 minutes

### 1. Read first — 5 min

Show `UserDashboard.tsx`.

Ask participants to identify responsibilities without immediately proposing component names.

Expected observations:

- data fetching
- loading/error handling
- filtering
- filter UI
- list rendering
- selection
- detail rendering
- editing
- mutation
- synchronization of selected user after mutation
- summary counts

### 2. Map the data flow — 5–10 min

Draw a rough tree.

Ask:

> If we split this into components, where should the data originate?

A useful direction is a page/container owning server data, with filter UI and presentation components below it.

### 3. State ownership — 10 min

For each state variable, ask who needs it.

Interesting discussion points:

- `users`: data owner
- `loading` / `error`: data-loading concern
- `search`, `role`, `showInactive`: filter concern
- `selectedUser`: selection concern; depending on the desired UX, it could be an ID rather than a whole object
- `editing`, `editStatus`: local modal/editing concern

A particularly useful question:

> Does the selected user need to be stored as an entire object, or can it be derived from the users + selected ID?

This exposes duplicated state and synchronization problems.

### 4. Component seams — 10–15 min

Potential boundaries include:

- `UserFilters`
- `UserList`
- `UserRow`
- `UserDetails`
- `EditUserStatus`

Do not require all of these.

Ask:

> What does this boundary buy us?

Good answers might include independent rendering responsibility, simpler props, localized state, easier testing, or making the component's contract clearer.

### 5. Smart vs. dumb — 10 min

Discuss whether there should be a "smart" `UserDashboard` and "dumb" presentation components.

Important nuance for experienced engineers:

The goal is not to mechanically create containers and presentational components. A component can own a small amount of state and still be a good component. The useful question is what responsibility belongs together.

### 6. Final review — 5 min

Compare the original and refactored code.

Ask:

- Did we reduce responsibility or merely move code around?
- Is data flow easier to follow?
- Is state owned by the narrowest reasonable component?
- Did any abstraction make the code harder to understand?
- Where are our render boundaries?
- What would make us change this design later?

## Optional extension

Have a second group critique the first group's refactor without seeing the original.

Ask them to identify:

- unnecessary props
- duplicated/derived state
- overly generic components
- premature abstractions
- unclear ownership

This works well because there should be legitimate architectural tradeoffs rather than one answer key.
