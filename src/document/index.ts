import { AccessLevels } from "../types";

export class Document {
    private id: number;
    private name: string;
    private content: string;

    public userAccessList: Map<number, AccessLevels>;

    public static totalDocs: number = 0;

    constructor(name: string, userId: number) {
        Document.totalDocs++
        this.id = Document.totalDocs;
        this.name = name;
        this.content = '';
        this.userAccessList.set(userId, AccessLevels.OWNER);
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public grantAccess(ownerId: number, userId: number, accessLevelRequested: AccessLevels): void {
        if (this.userAccessList.get(ownerId) !== AccessLevels.OWNER) {
            throw new Error("Can't grant access, Not Authorised");
        }
        if (accessLevelRequested !== AccessLevels.READER && accessLevelRequested !== AccessLevels.EDITOR) {
            throw new Error("Invalid Access Type");
        }
        this.userAccessList.set(userId, accessLevelRequested);
    }

    public getAccessLevel(userId: number): AccessLevels {
        if (!this.userAccessList.get(userId)) {
            throw new Error("User has no access to this doc");
        }
        return this.userAccessList.get(userId)
    }

    public getContent(userId: number): string {
        if (!this.userAccessList.get(userId)) {
            throw new Error("Can't Access content, Not Authorised");
        }
        return this.content;
    }

    public setContent(userId: number, content: string): void {
        if (!this.userAccessList.get(userId) || (this.userAccessList.get(userId) !== AccessLevels.EDITOR && this.userAccessList.get(userId) !== AccessLevels.OWNER)) {
            throw new Error("Can't Access content, Not Authorised");
        }
        this.content = content;
    }
}