# Idea Tracker

A local-first OpenClaw plugin for capturing and organizing ideas without automatically turning them into projects, research, purchases, or scheduled work.

## Model

Each idea has:

- title and optional description
- lifecycle status: `inbox`, `exploring`, `planned`, `active`, `parked`, `completed`, or `archived`
- priority: `low`, `normal`, or `high`
- optional category and normalized tags
- optional originating Discord channel
- append-only lifecycle history
- correctable notes
- categorized web links

New ideas default to `inbox` with normal priority. There are no checklists, background jobs, notifications, or automatic cross-plugin actions in v1.

## Tools

- `idea_add`
- `idea_update`
- `idea_transition`
- `idea_status`
- `idea_note_add`
- `idea_note_update`
- `idea_note_delete`
- `idea_link_add`
- `idea_link_remove`
- `idea_summary`

Deletion tools require explicit confirmation. Ideas themselves are archived through lifecycle transitions rather than deleted.

## Storage

The default SQLite database is:

```text
~/.openclaw/plugins/idea-tracker/ideas.sqlite
```

The database uses foreign keys, WAL mode, a busy timeout, transactions for multi-record changes, and owner-only file permissions. An alternate absolute or OpenClaw-state-relative path can be configured with `databasePath`.

## Development

```bash
npm install
npm test
npm run plugin:build
npm run plugin:validate
```
