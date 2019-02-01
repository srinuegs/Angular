/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DocumentsComponent } from './Documents/Documents.component';

import { OrgAdminComponent } from './OrgAdmin/OrgAdmin.component';
import { OrganizationComponent } from './Organization/Organization.component';

import { AddDocumentComponent } from './AddDocument/AddDocument.component';
import { UpdateDocumentComponent } from './UpdateDocument/UpdateDocument.component';
import { DeleteDocumentComponent } from './DeleteDocument/DeleteDocument.component';
import { GetDocumentsComponent } from './GetDocuments/GetDocuments.component';
import { RemoveDocumentsComponent } from './RemoveDocuments/RemoveDocuments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Documents', component: DocumentsComponent },
  { path: 'OrgAdmin', component: OrgAdminComponent },
  { path: 'Organization', component: OrganizationComponent },
  { path: 'AddDocument', component: AddDocumentComponent },
  { path: 'UpdateDocument', component: UpdateDocumentComponent },
  { path: 'DeleteDocument', component: DeleteDocumentComponent },
  { path: 'GetDocuments', component: GetDocumentsComponent },
  { path: 'RemoveDocuments', component: RemoveDocumentsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
