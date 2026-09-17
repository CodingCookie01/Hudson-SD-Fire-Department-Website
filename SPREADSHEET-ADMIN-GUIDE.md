# Hudson Fire Department Website – Staff and Events Editing Guide

## Editing staff

The staff page reads from the published Staff Google Sheet. Keep the header row unchanged:

```text
Member Name | Area | Position | Active | Profile Photo
```

Use these area values so people appear in the intended section:

- `Command Staff`
- `Operations`
- `Members`
- `Juniors`

The page also accepts singular forms such as `Member` and `Junior`, but using the plural values above is recommended.

Set `Active` to `Active` to show someone. Use another value, such as `Inactive`, to hide them without deleting the row.

For multiple positions, put them in one cell separated by semicolons:

```text
Treasurer; Safety Officer
```

The `Profile Photo` value must exactly match an image filename in this repository, such as `MikeS.jpg` or `chief.jpg`.

## Editing events and fundraisers

The events page reads from the published Fundraisers Google Sheet. Keep the header row unchanged:

```text
Activity | Activity type | Date | Start Time | Location | Description
```

Recommended activity types are:

- `Fundraiser`
- `Community Event`
- `Training`

The website also accepts the common typo `Comunity Event` and displays it as a Community Event. For consistency, use the correctly spelled `Community Event` for new rows.

Use dates in this format:

```text
9/12/2026
```

Use times in this format:

```text
11:00:00 AM
```

## Important editing rules

1. Do not rename, delete, or reorder the header columns.
2. Do not merge cells.
3. Put one person or event on each row.
4. Avoid blank rows inside the data.
5. Keep commas inside descriptions enclosed by Google Sheets automatically; do not paste raw CSV formatting into cells.
6. Double-check dates, times, names, and locations before closing the sheet.
7. The Google Sheet must remain published to the web as CSV or the website cannot load the updates.
8. Changes may take a short time to appear. Refresh the website with `Ctrl + Shift + R` on Windows or `Cmd + Shift + R` on Mac.

Only edit the spreadsheet data. Do not edit the website HTML unless you are changing the page design or functionality.
