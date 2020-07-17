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
 * The response for the build uploaded check.
 *
 */
class HasBuildUploadedResponse {
  /**
   * Create a HasBuildUploadedResponse.
   * @property {boolean} [hasBuildUploaded] true if a build has been uploaded,
   * false otherwise
   */
  constructor() {
  }

  /**
   * Defines the metadata of HasBuildUploadedResponse
   *
   * @returns {object} metadata of HasBuildUploadedResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'HasBuildUploadedResponse',
      type: {
        name: 'Composite',
        className: 'HasBuildUploadedResponse',
        modelProperties: {
          hasBuildUploaded: {
            required: false,
            serializedName: 'has_build_uploaded',
            type: {
              name: 'Boolean'
            }
          }
        }
      }
    };
  }
}

module.exports = HasBuildUploadedResponse;
