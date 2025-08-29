import calculate from "./calculate.js"
import copyToClipboard from "./copy_toclipboard.js"
import { handleButtonPress, handleClear, handleTyping } from "./keyHandlers.js"
import switchTheme from "./themeSwtch.js"
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", handleButtonPress)
})

document.querySelector("#clear").addEventListener("click", handleClear)
document.querySelector("#input").addEventListener("keydown", handleTyping)
document.querySelector("#equal").addEventListener("click", calculate)
document.querySelector("#copyToClipboard").addEventListener("click", copyToClipboard)
document.querySelector("#themeSwitcher").addEventListener("click", switchTheme)