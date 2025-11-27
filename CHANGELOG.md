# Changelog

All notable changes to `@doderasoftware/vue-stepper` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-27

### Summary
UI Customization System & Component Renaming

### Added
- **UI Customization Props** - Added `:ui`, `:mobileHeaderUI`, and `:optionalNoticeUI` props for complete styling control with 50+ customizable keys following BEM naming convention.
- **TypeScript Interfaces** - Exported `StepperUI`, `MobileHeaderUI`, and `OptionalNoticeUI` interfaces for type-safe customization.
- **Documentation Site** - Added comprehensive documentation at [vue-stepper.doderasoft.com](https://vue-stepper.doderasoft.com) with live demo, API reference, and UI customization guide.
- **SEO & AI Discoverability** - Added structured metadata, sitemap, robots.txt, and llms.txt for better search engine and AI assistant discoverability.

### Changed
- **Component Renaming** - Renamed `MultiStepStepper` to `Stepper` and `MultiStepMobileHeader` to `StepperMobileHeader` for simpler imports.
- **Backward Compatibility** - Legacy component names (`MultiStepStepper`, `MultiStepMobileHeader`) are still exported as aliases.

## [1.0.0] - 2025-11-26

### Summary
Initial Release

### Added
- **Stepper Component** - Full-featured multi-step wizard component with sidebar navigation, step progression, and validation support.
- **Mobile Responsive** - Built-in mobile header with dropdown navigation that automatically activates on smaller screens.
- **Optional Steps** - Support for marking steps as optional with visual indicators and skip functionality.
- **Step Locking** - Ability to disable specific steps and control navigation flow with `canGoNext` prop.
- **useMultiStep Composable** - Extracted composable for building custom stepper UIs with full control over step logic.
- **TypeScript Support** - Full TypeScript support with exported types for `StepConfig` and `StepChangeEvent`.
- **Slot-based Content** - Flexible slot system with `default`, `header`, and `title` slots for custom content injection.

---

For the interactive changelog with filtering, visit our [documentation](https://vue-stepper.doderasoft.com/#changelog).
