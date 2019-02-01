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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DocumentsService } from './Documents.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-documents',
  templateUrl: './Documents.component.html',
  styleUrls: ['./Documents.component.css'],
  providers: [DocumentsService]
})
export class DocumentsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  documentId = new FormControl('', Validators.required);
  bucketName = new FormControl('', Validators.required);
  document = new FormControl('', Validators.required);
  documentName = new FormControl('', Validators.required);
  updateDate = new FormControl('', Validators.required);
  documentType = new FormControl('', Validators.required);
  userId = new FormControl('', Validators.required);

  constructor(public serviceDocuments: DocumentsService, fb: FormBuilder) {
    this.myForm = fb.group({
      documentId: this.documentId,
      bucketName: this.bucketName,
      document: this.document,
      documentName: this.documentName,
      updateDate: this.updateDate,
      documentType: this.documentType,
      userId: this.userId
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDocuments.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.egs.breachrx.Documents',
      'documentId': this.documentId.value,
      'bucketName': this.bucketName.value,
      'document': this.document.value,
      'documentName': this.documentName.value,
      'updateDate': this.updateDate.value,
      'documentType': this.documentType.value,
      'userId': this.userId.value
    };

    this.myForm.setValue({
      'documentId': null,
      'bucketName': null,
      'document': null,
      'documentName': null,
      'updateDate': null,
      'documentType': null,
      'userId': null
    });

    return this.serviceDocuments.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'documentId': null,
        'bucketName': null,
        'document': null,
        'documentName': null,
        'updateDate': null,
        'documentType': null,
        'userId': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.egs.breachrx.Documents',
      'bucketName': this.bucketName.value,
      'document': this.document.value,
      'documentName': this.documentName.value,
      'updateDate': this.updateDate.value,
      'documentType': this.documentType.value,
      'userId': this.userId.value
    };

    return this.serviceDocuments.updateAsset(form.get('documentId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceDocuments.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceDocuments.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'documentId': null,
        'bucketName': null,
        'document': null,
        'documentName': null,
        'updateDate': null,
        'documentType': null,
        'userId': null
      };

      if (result.documentId) {
        formObject.documentId = result.documentId;
      } else {
        formObject.documentId = null;
      }

      if (result.bucketName) {
        formObject.bucketName = result.bucketName;
      } else {
        formObject.bucketName = null;
      }

      if (result.document) {
        formObject.document = result.document;
      } else {
        formObject.document = null;
      }

      if (result.documentName) {
        formObject.documentName = result.documentName;
      } else {
        formObject.documentName = null;
      }

      if (result.updateDate) {
        formObject.updateDate = result.updateDate;
      } else {
        formObject.updateDate = null;
      }

      if (result.documentType) {
        formObject.documentType = result.documentType;
      } else {
        formObject.documentType = null;
      }

      if (result.userId) {
        formObject.userId = result.userId;
      } else {
        formObject.userId = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'documentId': null,
      'bucketName': null,
      'document': null,
      'documentName': null,
      'updateDate': null,
      'documentType': null,
      'userId': null
      });
  }

}
