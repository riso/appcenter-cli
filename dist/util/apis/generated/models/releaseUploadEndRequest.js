/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * A request containing information pertaining to complete a release upload
 * process
 *
 */
class ReleaseUploadEndRequest {
  /**
   * Create a ReleaseUploadEndRequest.
   * @property {string} status The desired operation for the upload. Possible
   * values include: 'committed', 'aborted'
   */
  constructor() {
  }

  /**
   * Defines the metadata of ReleaseUploadEndRequest
   *
   * @returns {object} metadata of ReleaseUploadEndRequest
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ReleaseUploadEndRequest',
      type: {
        name: 'Composite',
        className: 'ReleaseUploadEndRequest',
        modelProperties: {
          status: {
            required: true,
            serializedName: 'status',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ReleaseUploadEndRequest;
