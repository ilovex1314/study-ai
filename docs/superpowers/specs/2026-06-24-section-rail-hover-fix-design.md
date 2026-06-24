# Section Rail Hover Fix Design

## Goal

Correct the desktop fixed module-navigation hover state so its expanded surface wraps the five visible menu items, while retaining a small top inset and removing the divider next to the menu icon.

## Scope

- Desktop only (`min-width: 1025px`).
- Keep the closed rail at 42 px by 46 px and keep its fixed right-side position.
- Keep all five existing labels, active-item styling, click behavior, keyboard focus behavior, and mobile navigation unchanged.

## Design

The final desktop CSS override is the sole source of truth. Its expanded state will use a height calculated from the content rows rather than the oversized 262 px fixed height. The route steps will start below a small top inset so the active item does not touch the panel’s top border.

The icon control retains its 42 px interactive area. Its right border is removed for all rail states; the panel outer border remains the only outline.

## Verification

Add a CSS contract test that asserts the final override uses the compact expanded height, applies a top margin to route steps, and sets the icon control's right border to zero. Run the focused test, then the full lesson test suite and production build. Finally, inspect the desktop hover state in the browser.
