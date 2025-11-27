#!/usr/bin/env node

/**
 * Changelog Management Script
 * 
 * This script helps manage the changelog.json file.
 * 
 * Usage:
 *   node scripts/changelog.js add <version> <type> <title> <description>
 *   node scripts/changelog.js generate-md
 * 
 * Examples:
 *   node scripts/changelog.js add 1.0.2 feature "New Feature" "Description of the feature"
 *   node scripts/changelog.js generate-md > CHANGELOG.md
 */

const fs = require('fs')
const path = require('path')

const CHANGELOG_PATH = path.join(__dirname, '../docs/public/changelog.json')
const CHANGELOG_MD_PATH = path.join(__dirname, '../CHANGELOG.md')

function loadChangelog() {
    const data = fs.readFileSync(CHANGELOG_PATH, 'utf8')
    return JSON.parse(data)
}

function saveChangelog(changelog) {
    fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2))
}

function addChange(version, type, title, description) {
    const changelog = loadChangelog()

    let versionEntry = changelog.versions.find(v => v.version === version)

    if (!versionEntry) {
        // Create new version entry
        versionEntry = {
            version,
            date: new Date().toISOString().split('T')[0],
            type: 'patch',
            summary: '',
            changes: []
        }
        changelog.versions.unshift(versionEntry)
    }

    versionEntry.changes.push({
        type,
        title,
        description
    })

    saveChangelog(changelog)
    console.log(`✅ Added ${type} "${title}" to version ${version}`)
}

function generateMarkdown() {
    const changelog = loadChangelog()

    let md = `# Changelog

All notable changes to \`@doderasoftware/vue-stepper\` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`

    for (const version of changelog.versions) {
        md += `## [${version.version}] - ${version.date}\n\n`

        if (version.summary) {
            md += `### Summary\n${version.summary}\n\n`
        }

        const grouped = {
            feature: [],
            change: [],
            fix: [],
            docs: [],
            breaking: []
        }

        for (const change of version.changes) {
            if (grouped[change.type]) {
                grouped[change.type].push(change)
            }
        }

        const sectionNames = {
            feature: 'Added',
            change: 'Changed',
            fix: 'Fixed',
            docs: 'Documentation',
            breaking: 'Breaking Changes'
        }

        for (const [type, changes] of Object.entries(grouped)) {
            if (changes.length > 0) {
                md += `### ${sectionNames[type]}\n`
                for (const change of changes) {
                    md += `- **${change.title}** - ${change.description}\n`
                }
                md += '\n'
            }
        }
    }

    md += `---

For the interactive changelog with filtering, visit our [documentation](https://vue-stepper.doderasoft.com/#changelog).
`

    return md
}

function syncMarkdown() {
    const md = generateMarkdown()
    fs.writeFileSync(CHANGELOG_MD_PATH, md)
    console.log('✅ CHANGELOG.md has been updated')
}

// CLI
const [, , command, ...args] = process.argv

switch (command) {
    case 'add':
        const [version, type, title, description] = args
        if (!version || !type || !title || !description) {
            console.error('Usage: changelog.js add <version> <type> <title> <description>')
            process.exit(1)
        }
        addChange(version, type, title, description)
        break

    case 'generate-md':
        console.log(generateMarkdown())
        break

    case 'sync':
        syncMarkdown()
        break

    default:
        console.log(`
Changelog Management Script

Commands:
  add <version> <type> <title> <description>  Add a new change entry
  generate-md                                  Output markdown to stdout
  sync                                         Update CHANGELOG.md from JSON

Types: feature, change, fix, docs, breaking

Examples:
  node scripts/changelog.js add 1.0.2 feature "New API" "Added new API endpoint"
  node scripts/changelog.js sync
`)
}
