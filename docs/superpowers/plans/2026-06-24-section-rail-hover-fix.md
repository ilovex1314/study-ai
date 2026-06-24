# Section Rail Hover Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the desktop section rail expand only to its menu content, with top breathing room and no icon-side divider.

**Architecture:** The final desktop media-query override in `styles.css` owns the rendered section rail. A contract test pins down the required expanded-state declarations, preventing legacy overrides earlier in the stylesheet from reintroducing the oversized fixed height or separator.

**Tech Stack:** React, CSS, Vitest, Vite.

---

### Task 1: Pin and repair the desktop section rail contract

**Files:**
- Modify: `apps/interactive-lessons/src/styles.test.mjs:23-30`
- Modify: `apps/interactive-lessons/src/styles.css:1517-1522`

- [ ] **Step 1: Write the failing style contract**

Replace the desktop rail assertion with:

```js
expect(contract).toContain(".section-rail:hover, .section-rail:focus-within, .section-rail.open { right: 0 !important; width: 154px !important; height: auto !important; padding: 8px 0 !important; }");
expect(contract).toContain(".section-rail .route-toggle { left: 0 !important; right: auto !important; border-left: 0 !important; border-right: 0 !important; }");
```

- [ ] **Step 2: Verify the contract fails before the CSS change**

Run: `PATH=/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH npm test -- --run src/styles.test.mjs`

Expected: FAIL because the final override still requires `height: 262px !important` and `border-right: 1px solid var(--line) !important`.

- [ ] **Step 3: Make the minimal final-override change**

Replace the expanded selector and toggle override with:

```css
.section-rail:hover, .section-rail:focus-within, .section-rail.open { right: 0 !important; width: 154px !important; height: auto !important; padding: 8px 0 !important; }
.section-rail .route-toggle { left: 0 !important; right: auto !important; border-left: 0 !important; border-right: 0 !important; }
```

- [ ] **Step 4: Verify the focused test passes**

Run: `PATH=/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH npm test -- --run src/styles.test.mjs`

Expected: PASS with the desktop section rail test green.

- [ ] **Step 5: Run regression checks and visual validation**

Run: `PATH=/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH npm test && PATH=/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH npm run build`

Expected: test suite and production build exit with code 0. Start the lesson app, inspect the desktop hover state, and confirm five menu items are contained with an 8 px top inset and no line beside the icon.

- [ ] **Step 6: Commit the isolated fix**

    git add apps/interactive-lessons/src/styles.css apps/interactive-lessons/src/styles.test.mjs docs/superpowers/plans/2026-06-24-section-rail-hover-fix.md
    git commit -m "fix: compact section rail hover menu"
