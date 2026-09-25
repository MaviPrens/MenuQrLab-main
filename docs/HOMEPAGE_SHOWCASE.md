# Homepage product strips

The homepage has two independent strips: wet wipes and magnets. Their images retain their original aspect ratios inside equal-height cards on mobile and desktop.

## Manage images

1. Open **Admin → Public Website CMS → Homepage product strips**.
2. Upload an image to the relevant strip. Edit its description, move it up or down, or remove it.
3. Adjust **Full-loop time** for that strip (12–80 seconds; a smaller number scrolls faster).
4. Select **Save & publish** for that strip. Repeat separately for the other strip.

The initial examples are Village Pizza (wet wipes) and Best Pizza (magnets). The public page uses these defaults if a showcase block has not been saved yet. Saving an empty list hides that strip.

For persistent uploads, configure `BLOB_READ_WRITE_TOKEN`. For public updates shared across devices, configure `DATABASE_URL` and apply the project's existing migrations. Without a database, admin edits persist in that browser's local demo store and are visible on its homepage only. No new database table or migration is required: both strip configurations use existing published website content blocks.
