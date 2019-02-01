import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.egs.breachrx{
   export class Documents extends Asset {
      documentId: string;
      bucketName: string;
      document: string;
      documentName: string;
      updateDate: Date;
      documentType: DocumentType;
      userId: OrgAdmin;
   }
   export class OrgAdmin extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
      isAdmin: Is_Admin;
      orgShortName: Organization;
   }
   export class Organization extends Participant {
      orgShortName: string;
      Name: string;
      Email: string;
   }
   export enum DocumentType {
      INCIDENT,
      TASK,
      CONVERSATION,
      CONTRACT,
      POLICY,
      CONTROL,
   }
   export enum Is_Admin {
      N,
      Y,
   }
   export class AddDocument extends Transaction {
      document: Documents;
      admin: OrgAdmin;
   }
   export class UpdateDocument extends Transaction {
      document: Documents;
      admin: OrgAdmin;
   }
   export class DeleteDocument extends Transaction {
      document: Documents;
      admin: OrgAdmin;
   }
   export class GetDocuments extends Transaction {
      document: Documents;
      admin: OrgAdmin;
   }
   export class BasicEvent extends Event {
   }
   export class DocumentNotification extends Event {
      documents: Documents;
   }
   export class RemoveDocuments extends Transaction {
   }
   export class RemoveNotification extends Event {
      documents: Documents;
   }
// }
