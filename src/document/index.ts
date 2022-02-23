import { AccessLevels } from "../types";

export class Document {
    private id: number;
    private name: string;
    private content: string;

    public userAccessList: Map<number, AccessLevels> = new Map();

    public static totalDocs: number = 0;

    constructor(name: string, userId: number) {
        Document.totalDocs++;
        this.id = Document.totalDocs;
        this.name = name;
        this.content = "";
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
            console.log("Can't grant access, Not Authorised");
            return;
        }
        if (accessLevelRequested !== AccessLevels.READER && accessLevelRequested !== AccessLevels.EDITOR) {
            console.log("Invalid Access Type");
            return;
        }
        this.userAccessList.set(userId, accessLevelRequested);
    }

    public getAccessLevel(userId: number): AccessLevels {
        if (!this.userAccessList.get(userId)) {
            console.log("User has no access to this doc");
            return null;
        }
        return this.userAccessList.get(userId);
    }

    public getContent(userId: number): string {
        if (this.userAccessList.get(userId) === undefined) {
            console.log("Can't get content, Not Authorised");
            return null;
        }
        return this.content;
    }

    public setContent(userId: number, content: string): void {
        if (this.userAccessList.get(userId) !== AccessLevels.EDITOR && this.userAccessList.get(userId) !== AccessLevels.OWNER) {
            console.log("Can't Access content, Not Authorised");
            return;
        }
        this.content = content;
    }
}