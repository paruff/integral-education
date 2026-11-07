// Copies text to the clipboard. Resolves true only if the copy worked, so callers
// never tell the learner "Copied" when it was not.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or no clipboard permission: fall back to a hidden textarea.
  }
  let box;
  try {
    box = document.createElement('textarea');
    box.value = text;
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.appendChild(box);
    box.select();
    return document.execCommand('copy') === true;
  } catch {
    return false;
  } finally {
    if (box?.parentNode) box.parentNode.removeChild(box);
  }
}
