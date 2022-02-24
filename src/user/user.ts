import { Document } from "../document";
import { AccessLevels } from "../types";

export default class User {
    private name: string;
    private id: number;
    private docs: Document[] = [];

    public static userCount = 0;

    constructor(name: string) {
        User.userCount++;
        this.name = name;
        this.id = User.userCount;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getAllDocuments(): Document[] {
        return this.docs;
    }

    public addDocument(name: string): Document {
        const doc: Document = new Document(name, this.id);
        this.docs.push(doc);
        return doc;
    }

    public grantEditAccess(userId: number, docId: number): void {
        this.docs.forEach(doc => {
            if (doc.getId() === docId) {
                doc.grantAccess(this.id, userId, AccessLevels.EDITOR);
            }
        });
    }

    public grantReadAccess(userId: number, docId: number): void {
        this.docs.forEach(doc => {
            if (doc.getId() === docId) {
                doc.grantAccess(this.id, userId, AccessLevels.READER);
            }
        });
    }
}