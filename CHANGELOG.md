# Changelog

All notable changes to `@doderasoftware/vue-stepper` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2025-11-27

### Summary
Fixed Dark Mode - Now Uses Class-Based Strategy

### Fixed
- **Dark Mode Control** - Switched from `prefers-color-scheme` media query to class-based dark mode (`.dark` class). Dark styles now only apply when a `dark` class is present on a parent element (html/body), giving full control to the consuming application.

### Changed
- **Tailwind 3** - Switched build tooling from Tailwind CSS v4 to v3 for better compatibility and class-based dark mode support.

## [1.0.8] - 2025-11-27

### Summary
Zero Dependencies - No Tailwind Required!

### Changed
- **Zero Config Installation** - Tailwind CSS is no longer required! All styles are now pre-compiled and bundled with the component.
- **Removed Peer Dependency** - Removed `tailwindcss` from peerDependencies. Only Vue 3.3+ is required.

### Fixed
- **Self-Contained Styles** - Component now ships with fully compiled CSS, making it work out of the box in any Vue 3 project.

## [1.0.7] - 2025-11-27

### Fixed
- **Dark Mode Background** - Main content area (`.stepper__main`) now has proper background color in dark mode (`bg-white dark:bg-zinc-950`).

## [1.0.6] - 2025-11-27

### Summary
Tailwind CSS Integration & Dark Mode Support

### Added
- **Dark Mode Support** - Full dark mode support throughout all components (Stepper, StepperMobileHeader, OptionalStepNotice). Uses `prefers-color-scheme` media query (system preference).
- **Step Description** - Added `description` field to StepConfig for displaying step descriptions in the default title slot.

### Changed
- **No CSS Import Required** - Styles are automatically injected, no need to import a separate CSS file.

## [1.0.4] - 2025-11-27

### Fixed
- **CSS Auto-Injection** - CSS is now automatically injected into the JS bundle, no separate CSS import required.

## [1.0.3] - 2025-11-27

### Fixed
- **CSS Extraction** - Fixed CSS not being applied when package is installed in other projects.

## [1.0.2] - 2025-11-27

### Summary
Documentation Internationalization & Package Fixes

### Added
- **i18n Support** - Added internationalization to documentation site with English and Romanian language support.
- **Language Switcher** - Added language switcher component in the sidebar for easy locale switching.

### Fixed
- **npm README** - Fixed missing README.md in npm package (was not displayed on npmjs.com for v1.0.1).

## [1.0.1] - 2025-11-27

### Summary
UI Customization System & Component Renaming

### Added
- **UI Customization Props** - Added :ui, :mobileHeaderUI, and :optionalNoticeUI props for complete styling control with 50+ customizable keys following BEM naming convention.
- **TypeScript Interfaces** - Exported StepperUI, MobileHeaderUI, and OptionalNoticeUI interfaces for type-safe customization.

### Changed
- **Component Renaming** - Renamed MultiStepStepper to Stepper and MultiStepMobileHeader to StepperMobileHeader for simpler imports.
- **Backward Compatibility** - Legacy component names (MultiStepStepper, MultiStepMobileHeader) are still exported as aliases.

### Documentation
- **Documentation Site** - Added comprehensive documentation at vue-stepper.doderasoft.com with live demo, API reference, and UI customization guide.
- **SEO & AI Discoverability** - Added structured metadata, sitemap, robots.txt, and llms.txt for better search engine and AI assistant discoverability.

## [1.0.0] - 2025-11-26

### Summary
Initial Release

### Added
- **Stepper Component** - Full-featured multi-step wizard component with sidebar navigation, step progression, and validation support.
- **Mobile Responsive** - Built-in mobile header with dropdown navigation that automatically activates on smaller screens.
- **Optional Steps** - Support for marking steps as optional with visual indicators and skip functionality.
- **Step Locking** - Ability to disable specific steps and control navigation flow with canGoNext prop.
- **useMultiStep Composable** - Extracted composable for building custom stepper UIs with full control over step logic.
- **TypeScript Support** - Full TypeScript support with exported types for StepConfig and StepChangeEvent.
- **Slot-based Content** - Flexible slot system with default, header, and title slots for custom content injection.

---

For the interactive changelog with filtering, visit our [documentation](https://vue-stepper.doderasoft.com/#changelog).
