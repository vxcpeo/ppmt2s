import fs from 'node:fs/promises'
import path from 'node:path'

const root = 'E:/workspace/chuangye/solana/ppmt2s/website'
const appPath = path.join(root, 'src/App.vue')
const tplPath = path.join(root, '.reskin/new-template.html')

const src = (await fs.readFile(appPath, 'utf8')).replace(/\r\n/g, '\n')
const tpl = (await fs.readFile(tplPath, 'utf8')).replace(/\r\n/g, '\n')

const marker = '\n<template>'
const idx = src.indexOf(marker)
if (idx < 0) throw new Error('template marker missing in App.vue')

const head = src.slice(0, idx)
const headLines = head.split('\n').length
const next = `${head}\n${tpl}`
await fs.writeFile(appPath, next, 'utf8')

const legacy = path.join(root, 'src/styles/cx.css')
const backupDir = path.join(root, '.reskin/backup/legacy-shell')
await fs.mkdir(backupDir, { recursive: true })
try {
  await fs.access(legacy)
  await fs.copyFile(legacy, path.join(backupDir, 'cx.css'))
  await fs.rm(legacy)
  console.log('legacy stylesheet moved to .reskin/backup/legacy-shell/cx.css')
} catch {
  console.log('no legacy stylesheet found')
}

console.log(`script head lines: ${headLines}`)
console.log(`new App.vue bytes: ${Buffer.byteLength(next, 'utf8')}`)
console.log(`has 平台特征: ${next.includes('平台特征')}`)
console.log(`has </script>: ${next.includes('</script>')}`)
