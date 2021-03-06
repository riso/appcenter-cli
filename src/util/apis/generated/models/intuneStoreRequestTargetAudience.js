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
 * Class representing a IntuneStoreRequestTargetAudience.
 */
class IntuneStoreRequestTargetAudience {
  /**
   * Create a IntuneStoreRequestTargetAudience.
   * @property {string} [name] display name for the target audience/group
   */
  constructor() {
  }

  /**
   * Defines the metadata of IntuneStoreRequestTargetAudience
   *
   * @returns {object} metadata of IntuneStoreRequestTargetAudience
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'IntuneStoreRequest_target_audience',
      type: {
        name: 'Composite',
        className: 'IntuneStoreRequestTargetAudience',
        modelProperties: {
          name: {
            required: false,
            serializedName: 'name',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = IntuneStoreRequestTargetAudience;
