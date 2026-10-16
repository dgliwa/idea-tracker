import type { IdeaDetail, IdeaLink, IdeaNote, IdeaPriority, IdeaStatus, IdeaSummary, LinkKind } from "../types.js";
export interface CreateIdeaRecord {
    title: string;
    description?: string;
    category?: string;
    priority: IdeaPriority;
    status: IdeaStatus;
    tags: string[];
    sourceChannel?: string;
}
export interface UpdateIdeaRecord {
    title?: string;
    description?: string | null;
    category?: string | null;
    priority?: IdeaPriority;
    tags?: string[];
    sourceChannel?: string | null;
}
export interface ListIdeaOptions {
    status?: IdeaStatus;
    priority?: IdeaPriority;
    category?: string;
    tag?: string;
    query?: string;
    includeArchived?: boolean;
    limit?: number;
}
export declare class IdeaDatabase {
    private readonly db;
    constructor(path: string);
    close(): void;
    schemaVersion(): number;
    quickCheck(): string[];
    private migrate;
    create(input: CreateIdeaRecord, now: string): IdeaDetail;
    update(id: string, input: UpdateIdeaRecord, now: string): IdeaDetail | undefined;
    transition(id: string, status: IdeaStatus, reason: string | undefined, now: string): IdeaDetail | undefined;
    get(id: string): IdeaDetail | undefined;
    list(options?: ListIdeaOptions): IdeaDetail[];
    addNote(ideaId: string, content: string, now: string): IdeaNote | undefined;
    updateNote(id: string, content: string, now: string): IdeaNote | undefined;
    deleteNote(id: string, now: string): boolean;
    addLink(ideaId: string, url: string, label: string | undefined, kind: LinkKind, now: string): IdeaLink | undefined;
    removeLink(id: string, now: string): boolean;
    summary(): IdeaSummary;
    private touch;
    private mapIdea;
    private mapNote;
    private mapLink;
    private mapTransition;
}
