/**
 * Imports FigmaDeckExportPayload (version 1) from the Ai Labs slides app
 * legacy deck export builders.
 */
'use strict'

/** @typedef {{ r: number, g: number, b: number }} RGB */
/** @typedef {{ family: string, style: string }} FontName */

var COLORS = {
  foreground: { r: 0.94, g: 0.94, b: 0.96 },
  'muted-foreground': { r: 0.66, g: 0.63, b: 0.72 },
  primary: { r: 139 / 255, g: 123 / 255, b: 199 / 255 },
  card: { r: 0.18, g: 0.17, b: 0.22 },
  muted: { r: 0.28, g: 0.26, b: 0.32 },
}

var SLIDE_FRAME_BG = { r: 28 / 255, g: 26 / 255, b: 35 / 255 }
var FRAME_GAP = 64
var MIN_TEXT_WIDTH = 400

function validatePayload(data) {
  if (!data || typeof data !== 'object') throw new Error('Paste valid JSON.')
  if (data.version !== 1) throw new Error('Expected payload version 1.')
  if (typeof data.deckId !== 'string') throw new Error('Missing deckId.')
  if (!Array.isArray(data.frames)) throw new Error('Missing frames array.')
}

/**
 * @param {unknown} node
 * @param {(fn: FontName) => void} onFont
 */
function collectFonts(node, onFont) {
  if (!node || typeof node !== 'object') return
  var n = /** @type {{ type?: string, fontFamily?: string, children?: unknown[] }} */ (
    node
  )
  if (n.type === 'TEXT') {
    onFont(fontForExport(n.fontFamily))
  }
  if (n.type === 'FRAME' && Array.isArray(n.children)) {
    for (var i = 0; i < n.children.length; i++) collectFonts(n.children[i], onFont)
  }
}

/** @param {string | undefined} ff */
function fontForExport(ff) {
  if (ff === 'display') return { family: 'Space Grotesk', style: 'Medium' }
  return { family: 'Inter', style: 'Regular' }
}

/** @returns {RGB} */
function fillToRgb(fill) {
  if (fill === 'primary') return COLORS.primary
  if (fill === 'foreground') return COLORS.foreground
  if (fill === 'muted-foreground' || fill === 'muted') return COLORS['muted-foreground']
  if (fill === 'card' || fill === 'background') return COLORS.card
  return COLORS.foreground
}

/**
 * @param {FontName} font
 */
async function loadFontSafe(font) {
  try {
    await figma.loadFontAsync(font)
    return font
  } catch (_e) {
    var fallback = { family: 'Inter', style: 'Regular' }
    await figma.loadFontAsync(fallback)
    return fallback
  }
}

/**
 * @param {unknown} node
 * @param {FrameNode} parent
 */
async function buildNode(node, parent) {
  if (!node || typeof node !== 'object') return
  var raw = /** @type {Record<string, unknown>} */ (node)
  var type = raw.type

  if (type === 'TEXT') {
    var requested = fontForExport(/** @type {string | undefined} */ (raw.fontFamily))
    var font = await loadFontSafe(requested)
    var text = figma.createText()
    text.name = String(raw.name || 'Text')
    text.fontName = font
    text.fontSize = typeof raw.fontSize === 'number' ? raw.fontSize : 16
    var fillKey = /** @type {string | undefined} */ (raw.fill)
    text.fills = [{ type: 'SOLID', color: fillToRgb(fillKey) }]
    var chars = typeof raw.characters === 'string' ? raw.characters : ''
    text.characters = chars
    var w =
      typeof raw.width === 'number' && raw.width >= MIN_TEXT_WIDTH
        ? raw.width
        : MIN_TEXT_WIDTH
    text.resize(w, text.height)
    text.textAutoResize = 'HEIGHT'
    text.x = typeof raw.x === 'number' ? raw.x : 0
    text.y = typeof raw.y === 'number' ? raw.y : 0
    parent.appendChild(text)
    return
  }

  if (type === 'RECTANGLE') {
    var rect = figma.createRectangle()
    rect.name = String(raw.name || 'Rectangle')
    rect.resize(
      typeof raw.width === 'number' ? raw.width : 100,
      typeof raw.height === 'number' ? raw.height : 100,
    )
    rect.x = typeof raw.x === 'number' ? raw.x : 0
    rect.y = typeof raw.y === 'number' ? raw.y : 0
    var corner = typeof raw.cornerRadius === 'number' ? raw.cornerRadius : 0
    rect.cornerRadius = corner
    var rectFill = /** @type {string | undefined} */ (raw.fill)
    rect.fills = [{ type: 'SOLID', color: fillToRgb(rectFill || 'muted') }]
    parent.appendChild(rect)
    return
  }

  if (type === 'FRAME') {
    var frame = figma.createFrame()
    frame.name = String(raw.name || 'Frame')
    frame.resize(
      typeof raw.width === 'number' ? raw.width : 400,
      typeof raw.height === 'number' ? raw.height : 300,
    )
    frame.x = typeof raw.x === 'number' ? raw.x : 0
    frame.y = typeof raw.y === 'number' ? raw.y : 0
    var fillsHint = raw.fills
    if (fillsHint === 'background') {
      frame.fills = [{ type: 'SOLID', color: COLORS.card }]
    } else {
      frame.fills = []
    }
    parent.appendChild(frame)
    var kids = raw.children
    if (Array.isArray(kids)) {
      for (var j = 0; j < kids.length; j++) await buildNode(kids[j], frame)
    }
  }
}

/**
 * @param {unknown} data
 */
async function importPayload(data) {
  validatePayload(data)
  var payload = /** @type {{ frames: Array<Record<string, unknown>> }} */ (data)

  var needed = /** @type {Map<string, FontName>} */ (new Map())
  function addFont(fn) {
    var key = fn.family + '\0' + fn.style
    needed.set(key, fn)
  }

  for (var i = 0; i < payload.frames.length; i++) {
    var fr = payload.frames[i]
    var children = fr && fr.children
    if (Array.isArray(children)) {
      for (var c = 0; c < children.length; c++) collectFonts(children[c], addFont)
    }
  }

  for (var _k of needed.values()) {
    await loadFontSafe(/** @type {FontName} */ (_k))
  }

  var col = 0
  for (var f = 0; f < payload.frames.length; f++) {
    var spec = payload.frames[f]
    var w = typeof spec.width === 'number' ? spec.width : 1920
    var h = typeof spec.height === 'number' ? spec.height : 1080
    var slide = figma.createFrame()
    slide.name = String(spec.name || 'Slide')
    slide.resize(w, h)
    slide.x = col * (w + FRAME_GAP)
    slide.y = 0
    col += 1
    slide.fills = [{ type: 'SOLID', color: SLIDE_FRAME_BG }]
    figma.currentPage.appendChild(slide)

    var ch = spec.children
    if (Array.isArray(ch)) {
      for (var k = 0; k < ch.length; k++) await buildNode(ch[k], slide)
    }
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children)
}

var UI_HTML =
  '<!DOCTYPE html><html><head><meta charset="utf-8"/><style>' +
  'body{font:12px -apple-system,BlinkMacSystemFont,sans-serif;margin:12px;color:#333}' +
  'textarea{width:100%;height:240px;box-sizing:border-box;font:11px/1.4 ui-monospace,monospace}' +
  'button{margin-top:8px;padding:8px 14px;cursor:pointer}' +
  'p{margin:0 0 8px;line-height:1.4}' +
  '</style></head><body>' +
  '<p>Paste legacy slide deck JSON.</p>' +
  '<textarea id="json" placeholder="{ &quot;version&quot;: 1, ... }"></textarea>' +
  '<button type="button" id="go">Import frames</button>' +
  '<script>' +
  "var go=document.getElementById('go');var t=document.getElementById('json');" +
  "go.onclick=function(){parent.postMessage({pluginMessage:{type:'import',text:t.value}},'*');};" +
  '</script></body></html>'

figma.showUI(UI_HTML, { width: 420, height: 360 })

figma.ui.onmessage = function (msg) {
  if (!msg || msg.type !== 'import') return
  var text = typeof msg.text === 'string' ? msg.text : ''
  var data
  try {
    data = JSON.parse(text)
  } catch (e) {
    figma.notify('Invalid JSON: ' + (e && e.message ? e.message : 'parse error'), {
      error: true,
    })
    return
  }
  importPayload(data)
    .then(function () {
      figma.notify('Imported deck frames.', { timeout: 3 })
      figma.closePlugin()
    })
    .catch(function (err) {
      figma.notify(err && err.message ? err.message : 'Import failed', { error: true })
    })
}
