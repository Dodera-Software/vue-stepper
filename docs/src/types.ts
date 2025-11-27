export interface PropDefinition {
    name: string
    type: string
    default: string
    description: string
}

export interface EventDefinition {
    name: string
    payload: string
    description: string
}

export interface SlotDefinition {
    name: string
    props: string
    description: string
}

export interface StepConfig {
    category: string
    title: string
    disabled?: boolean
    optional?: boolean
}

export interface Section {
    id: string
    title: string
}
