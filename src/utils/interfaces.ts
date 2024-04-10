export interface ChangelogInterface {
    id: string,
    type: ChangelogType
    date: string,
    title: string,
    content: string
}

export enum ChangelogType {
    BUG = 'BUG',
    FEAT = 'FEAT'
}