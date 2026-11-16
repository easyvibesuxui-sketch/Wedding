/*
 * The invitation is a phone-shaped card. On a phone it is the screen; on
 * anything wider it is a column of the same proportions in the middle of the
 * window. Everything the guest sees — the opening, the page, the floating
 * controls, the drifting petals — lives inside that one column, so no part of
 * it is ever stretched across a wide window while the rest stays narrow.
 */

/** The page's own width. */
export const CARD = 'mx-auto w-full max-w-[30rem]';

/**
 * A fixed layer over the card, exactly as wide. It is transformed (to centre
 * it), which makes it the containing block of `fixed` descendants: controls
 * inside can stay `fixed` and are placed against the card, not the window.
 */
export const STAGE = 'fixed inset-y-0 left-1/2 w-full max-w-[30rem] -translate-x-1/2';
