# Little Elsewhere

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/argaromit-lab/difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/argaromit-lab/difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

A spot-the-difference journey through three original illustrated worlds. Visit a cottage above the weather, a moonlit teahouse, and an observatory beneath the sea. Find 27 small changes hidden in the pictures, with paired discovery rings, a field journal and a locally synthesized chime.

## Run it

Node.js 22.18 or later. No installation or build step is needed.

```sh
node serve.ts
```

Open **http://127.0.0.1:8085**. Any static HTTP server can also serve the `game/` directory. All art, scripts, style and sound work offline; the game uses no third-party library or remote asset.

## Play

- Click a changed object in either picture. A matching ring appears in both, and your discovery joins the field notes.
- Explore three chapters with 7, 9 and 11 differences. Each chapter has its own timer and three optional hints. Consecutive finds earn a score bonus; a wrong guess costs eight seconds.
- Use **A little hint** for a written clue and a temporary broad region. A hint never marks the answer for you.
- Toggle **Magnifier** to inspect the same point in both pictures. **Relaxed mode** removes time pressure. If time expires, continue in relaxed mode with your finds intact or try again.
- Your chapter, remaining time, hints, finds, points, sound and mode are saved in this browser. Restarting resets only the current chapter. Browser storage is optional: play still works when storage is unavailable.

Keyboard: focus a picture with Tab, move the crosshair with arrow keys, hold Shift for finer movement, and press Enter to mark. **H** offers a hint, **L** toggles the magnifiers, **Space** pauses, **?** opens help, and **1–3** selects a chapter. Escape closes a dialog or dismisses the lens. Sound starts muted; enable it with the music-note button.

## Hand in the game

`main.ts` copies `game/` and the four real browser captures in `screenshots/`, then writes a deterministic dossier with the official, unmodified `vendor/makefun-game.ts` helper. It uses only Node's standard library.

```sh
# Linux / macOS
MAKEFUN_OUTPUT_DIR=out node main.ts

# PowerShell
$env:MAKEFUN_OUTPUT_DIR="out"; node main.ts
```

## Source and originality

`illustrations.js` draws the original scenes directly from authored vector paths. `chapters.js` defines the 27 changes and their clues. `hunt.js` controls input, timers, hints, magnification and completion. `progress.js` validates saved state; `sound.js` synthesizes the original chimes. There are no downloaded illustrations, commercial characters, remote fonts, generated dependency bundles or competitor files in the game.

The `vendor/` dossier helper is supplied by make.fun, byte-identical to its kit. It is used by the Node hand-in program and is not shipped to the browser. All screenshots are unedited browser captures taken after actual pointer play.

MIT licensed. Built for the [Make the best spot the difference game](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451) bounty.

---

<sub>Entered on [make.fun](https://make.fun/?ref=e1sxrf3n&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
