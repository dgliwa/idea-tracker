import type { ListIdeaOptions, UpdateIdeaRecord } from "./persistence/db.js";
import { IdeaDatabase } from "./persistence/db.js";
import type { IdeaPriority, IdeaStatus, LinkKind } from "./types.js";
export declare class IdeaValidationError extends Error {
}
export interface AddIdeaInput {
    title: string;
    description?: string;
    category?: string;
    priority?: IdeaPriority;
    status?: IdeaStatus;
    tags?: string[];
    sourceChannel?: string;
}
export declare class IdeaService {
    private readonly database;
    private readonly clock;
    constructor(database: IdeaDatabase, clock?: () => Date);
    private now;
    add(input: AddIdeaInput): import("./types.js").IdeaDetail;
    update(id: string, input: UpdateIdeaRecord): import("./types.js").IdeaDetail;
    transition(id: string, status: IdeaStatus, reason?: string): import("./types.js").IdeaDetail;
    status(id: string): import("./types.js").IdeaDetail;
    list(options?: ListIdeaOptions): import("./types.js").IdeaDetail[];
    addNote(ideaId: string, content: string): import("./types.js").IdeaNote;
    updateNote(noteId: string, content: string): import("./types.js").IdeaNote;
    deleteNote(noteId: string): {
        deleted: boolean;
        noteId: string;
    };
    addLink(ideaId: string, url: string, label: string | undefined, kind?: LinkKind): import("./types.js").IdeaLink;
    removeLink(linkId: string): {
        deleted: boolean;
        linkId: string;
    };
    summary(): import("./types.js").IdeaSummary;
}
