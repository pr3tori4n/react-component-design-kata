# Possible Refactoring Direction

This is deliberately **not** a canonical answer.

One reasonable end state might look like:

```text
UserDashboard
├── UserFilters
├── UserSummary
└── UserList
    └── UserRow
        └── UserDetailsDialog
            └── EditUserStatus
```

The dashboard owns the fetched users and coordinates the major feature-level state.

`UserFilters` owns transient filter UI state if those filters do not need to be controlled elsewhere.

`UserList` receives the users to render and an `onSelect` callback.

The details dialog can receive a user and own its edit-mode state.

A stronger variant stores `selectedUserId` rather than the whole `selectedUser` object:

```ts
const selectedUser = users.find((user) => user.id === selectedUserId);
```

That avoids maintaining two representations of the same user and makes updates less error-prone.

Another reasonable design is for a feature-level custom hook to own fetching/mutation behavior:

```ts
const {
  users,
  loading,
  error,
  updateUserStatus
} = useUsers();
```

Do not require this extraction. Discuss whether it improves the separation of concerns or simply moves complexity into another file.

The key success criterion is not the number of components or hooks. It is whether the resulting design makes **data ownership, one-way flow, state locality, and component responsibilities** clearer.
