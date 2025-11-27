/**
 * UI Customization Types for @doderasoftware/vue-stepper
 * 
 * These interfaces allow complete control over the component's appearance
 * without modifying the default CSS. Pass class names via the :ui prop.
 */

// ============================================================================
// MultiStepStepper UI Customization
// ============================================================================

export interface StepperUI {
    // Root container
    /** Root container element */
    root?: string

    // Sidebar
    /** Desktop sidebar container */
    sidebar?: string
    /** Sidebar inner content wrapper */
    sidebarContent?: string
    /** Sidebar title text */
    sidebarTitle?: string

    // Navigation
    /** Navigation container */
    nav?: string
    /** Individual step button - base state */
    navItem?: string
    /** Step button - current/active state */
    navItemCurrent?: string
    /** Step button - completed state */
    navItemCompleted?: string
    /** Step button - disabled state */
    navItemDisabled?: string

    // Step Indicator (number/check/lock icon circle)
    /** Step indicator - base state */
    indicator?: string
    /** Step indicator - current state */
    indicatorCurrent?: string
    /** Step indicator - completed state */
    indicatorCompleted?: string
    /** Step indicator - disabled state */
    indicatorDisabled?: string
    /** Check icon inside indicator */
    indicatorCheckIcon?: string
    /** Lock icon inside indicator */
    indicatorLockIcon?: string

    // Step Content (category + title)
    /** Step content container */
    stepContent?: string
    /** Step category text - base state */
    stepCategory?: string
    /** Step category - current state */
    stepCategoryCurrent?: string
    /** Step category - completed state */
    stepCategoryCompleted?: string
    /** Step category - disabled state */
    stepCategoryDisabled?: string
    /** Step title text - base state */
    stepTitle?: string
    /** Step title - current state */
    stepTitleCurrent?: string
    /** Step title - completed state */
    stepTitleCompleted?: string
    /** Step title - disabled state */
    stepTitleDisabled?: string
    /** Optional badge next to title */
    optionalBadge?: string

    // Progress
    /** Progress section container */
    progressContainer?: string
    /** Progress header (label + percentage) */
    progressHeader?: string
    /** Progress bar track */
    progressBar?: string
    /** Progress bar fill */
    progressFill?: string

    // Main Content Area
    /** Main content container */
    main?: string
    /** Main content inner wrapper */
    mainContent?: string
    /** Content wrapper div */
    contentWrapper?: string
    /** Content card */
    card?: string

    // Navigation Buttons
    /** Navigation buttons container */
    navigation?: string
    /** Button base styles */
    button?: string
    /** Primary button (next/complete) */
    buttonPrimary?: string
    /** Secondary button (back) */
    buttonSecondary?: string
    /** Disabled button state */
    buttonDisabled?: string
    /** Button icon base */
    buttonIcon?: string
    /** Button icon on left side */
    buttonIconLeft?: string
    /** Button icon on right side */
    buttonIconRight?: string

    // Optional Notice
    /** Optional step notice container */
    optionalNotice?: string
}

// ============================================================================
// MultiStepMobileHeader UI Customization  
// ============================================================================

export interface MobileHeaderUI {
    /** Root container */
    root?: string
    /** Main header bar */
    header?: string
    /** Info section (title + progress) */
    info?: string
    /** Title text */
    title?: string
    /** Progress section */
    progress?: string
    /** Progress bar track */
    progressBar?: string
    /** Progress bar fill */
    progressFill?: string
    /** Progress text (e.g., "2/4") */
    progressText?: string
    /** Menu toggle button */
    menuButton?: string
    /** Menu icon */
    menuIcon?: string

    // Dropdown Menu
    /** Dropdown menu container */
    menu?: string
    /** Menu item - base state */
    menuItem?: string
    /** Menu item - current state */
    menuItemCurrent?: string
    /** Menu item - completed state */
    menuItemCompleted?: string
    /** Menu item - disabled state */
    menuItemDisabled?: string
    /** Menu item indicator - base */
    menuIndicator?: string
    /** Menu item indicator - current */
    menuIndicatorCurrent?: string
    /** Menu item indicator - completed */
    menuIndicatorCompleted?: string
    /** Menu item indicator - disabled */
    menuIndicatorDisabled?: string
    /** Menu indicator check icon */
    menuIndicatorCheckIcon?: string
    /** Menu indicator lock icon */
    menuIndicatorLockIcon?: string
    /** Menu item title */
    menuItemTitle?: string
}

// ============================================================================
// OptionalStepNotice UI Customization
// ============================================================================

export interface OptionalNoticeUI {
    /** Root container */
    root?: string
    /** Content wrapper */
    content?: string
    /** Info icon */
    icon?: string
    /** Text wrapper */
    text?: string
    /** Title/label text */
    title?: string
}

// ============================================================================
// Re-export from useMultiStep for convenience
// ============================================================================

export type {
    StepConfig,
    StepChangeEvent,
    UseMultiStepOptions,
    StepChangeHandler,
} from './useMultiStep'
