## v0.6.2
* make `home`, `ctrl+a`, `end` to be used as normal key on other input focus

## v0.6.1
* fix bug cannot move cursor by arrow keys when inputFocus

## v0.6.0
* update lscode api version, node version
* refacotring codes
* write script to include all keybindings into package.json for easier maintainance
* add `ctrl+c` (copy)
* change from `alt+{NUM}` to `ctrl+{NUM}` (openEditorAtIndex{NUM})
* fix bug `ctrl+y` not paste in windows os
* fix bug hint, suggestion, list, cannot select by default emacs move
* add `ctrl+x ctrl+w` (save as)
* add `ctrl+x k` (same as `ctrl+x ctrl+c`)

## v0.5.0
* Change `escape` to `alt` for `move to top` and `move to bottom` command (if more people use `escape` more than `alt`, i will add it back).

  _The reason behind this change is to avoid `key combination is not command`._

* Fix `escape` not cancel multi cursors

## v0.4.1
* Fix cannot `cmd+z (ctrl+z)` `cmd+shift+z (ctrl+y)` on search input

## v0.4.0
* Add `ctrl+x u`, `ctrl+shift+-` (undo)

## v0.3.0
* Add `ctrl+x s` (save all)
* Add `alt+g g` (go to line)
* Add `alt+g c` (go to char)
* Add `ctrl+x h` (select all)

## v0.2.2
* Fix cannot move up & down to select suggestion

## v0.2.1
* Fix cannot hit `escape` to close suggest widget

## v0.2.0
* Add `alt+d` (move forward one word)
* Add `alt+b` (move backward one word)
* Add `ctrl+r` (previous matching)
* Add `alt+d` (delete word after)

## v0.1.1
* Stop mark mode when hit backspace
* Fix mark mode not stop when pressing `ctrl+g` if selection is empty

## v0.1.0
* Upgrade libs version
* Refactoring code
* Fix (many) incorrect behaviours

## v0.0.5
* [Untracked changes, sorry]

## v0.0.4
* Fix bug cannot use `ctrl+n`, `ctrl+p`, `down`, `up` in widget

## v0.0.3
* Update change log

## v0.0.2
* Update read me, add repository to package.json

## v0.0.1
* First release
