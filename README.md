# Little Elsewhere

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/argaromit-lab/difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/argaromit-lab/difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

A spot-the-difference journey through six original illustrated worlds. Visit a cottage above the weather, a moonlit teahouse, an observatory beneath the sea, a botanical glasshouse, an apricot-coloured harbour, and an old library. Find 54 changes with paired coral discovery rings, a field journal and original procedural audio.

The harbour and library combine original layered light, material details and grounded shadows with varied object puzzles: a missing seabird, a reversed pennant, an open book and a notched bookmark sit alongside colour, count and shape changes. Every difference has an authored hit region and a scene-specific hint.

## Run it

Node.js 22.18 or later. No installation or build step is needed.

```sh
node serve.ts
```

Open **http://127.0.0.1:8085**. Any static HTTP server can also serve the `game/` directory. All art, scripts, style and sound work offline; the game uses no third-party library or remote asset.

## Play

- Click a changed object in either picture. A matching ring appears in both, and your discovery joins the field notes.
- Explore six chapters with 7, 9, 11, 9, 9 and 9 differences. Each chapter has its own timer and three optional hints. Consecutive finds earn a score bonus; a wrong guess costs eight seconds.
- Use **A little hint** for a written clue and a temporary broad region. A hint never marks the answer for you.
- Toggle **Magnifier** to inspect the same point in both pictures. **Relaxed mode** removes time pressure. If time expires, continue in relaxed mode with your finds intact or try again.
- Your chapter, remaining time, hints, finds, points, sound and mode are saved in this browser. Restarting resets only the current chapter. Browser storage is optional: play still works when storage is unavailable.

Keyboard: focus a picture with Tab, move the crosshair with arrow keys, hold Shift for finer movement, and press **Enter or Space** to mark. **H** offers a hint, **M** toggles paired magnifiers, **R** toggles relaxed mode, **P** pauses, **?** opens help, and **1–6** selects a chapter. Escape closes a dialog or dismisses the lens. Space outside a picture also pauses. Sound starts muted; the HUD Sound button enables soft finds, error taps, hint and magnifier tones, and chapter fanfares.

## Hand in the game

`main.ts` copies `game/` and the four real mid-round PNG browser captures in `screenshots/`, then writes a deterministic dossier with the official, unmodified `vendor/makefun-game.ts` helper. Each capture shows a different scene, three discoveries and at least four remaining differences. It uses only Node's standard library.

```sh
# Linux / macOS
MAKEFUN_OUTPUT_DIR=out node main.ts

# PowerShell
$env:MAKEFUN_OUTPUT_DIR="out"; node main.ts
```

## Source and originality

The modules under `game/js/` each have a clear role: `chapters-data.js` defines all 54 changes and clues; `illustration-renderer.js` dispatches the original SVG scenes from `original-worlds.js` and `storybook-worlds.js`; `difference-engine.js` resolves overlapping hit regions by nearest object and computes scoring; `magnifier-hint.js` renders paired magnifiers and broad hint regions; `keyboard-input.js` owns the actual keyboard handlers; `audio-synth.js` synthesizes original effects; `hud-ui.js` renders navigation and found markers; `progress-storage.js` validates saved state. `game-controller.js` coordinates the round, timer and dialogs. There are no downloaded illustrations, commercial characters, remote fonts or competitor files in the game.

The `vendor/` dossier helper is supplied by make.fun, byte-identical to its kit. It is used by the Node hand-in program and is not shipped to the browser. All screenshots are unedited browser captures taken after actual pointer play.

MIT licensed. Built for the [Make the best spot the difference game](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451) bounty.

---

<sub>Entered on [make.fun](https://make.fun/?ref=e1sxrf3n&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
