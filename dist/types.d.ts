export declare const IDEA_STATUSES: readonly ["inbox", "exploring", "planned", "active", "parked", "completed", "archived"];
export declare const IDEA_PRIORITIES: readonly ["low", "normal", "high"];
export declare const LINK_KINDS: readonly ["reference", "inspiration", "source", "related", "other"];
export type IdeaStatus = typeof IDEA_STATUSES[number];
export type IdeaPriority = typeof IDEA_PRIORITIES[number];
export type LinkKind = typeof LINK_KINDS[number];
export interface Idea {
    id: string;
    title: string;
    description?: string;
    category?: string;
    priority: IdeaPriority;
    status: IdeaStatus;
    tags: string[];
    sourceChannel?: string;
    createdAt: string;
    updatedAt: string;
}
export interface IdeaTransition {
    id: string;
    ideaId: string;
    fromStatus?: IdeaStatus;
    toStatus: IdeaStatus;
    reason?: string;
    occurredAt: string;
}
export interface IdeaNote {
    id: string;
    ideaId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
export interface IdeaLink {
    id: string;
    ideaId: string;
    url: string;
    label?: string;
    kind: LinkKind;
    createdAt: string;
}
export interface IdeaDetail {
    idea: Idea;
    notes: IdeaNote[];
    links: IdeaLink[];
    history: IdeaTransition[];
}
export interface IdeaSummary {
    total: number;
    byStatus: Record<IdeaStatus, number>;
    byPriority: Record<IdeaPriority, number>;
    categories: Array<{
        category: string;
        count: number;
    }>;
    untagged: number;
}
