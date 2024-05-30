# random-sound-random-time

Rough typescript script to play a random mp3 from a directory on a random time interval.

Intended to be run on nix with the provided dev flake but will work on anything with cvlc (command line vlc player) and node installed.

```sh
nix develop
# Or if you don't have flakes and commands enabled
nix develop --extra-experimental-features nix-command --extra-experimental-features flakes


```sh
npm ci
npx tsc
node dist/main.js
```
