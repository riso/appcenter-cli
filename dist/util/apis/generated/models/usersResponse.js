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
 * Class representing a UsersResponse.
 */
class UsersResponse {
  /**
   * Create a UsersResponse.
   * @property {array} value
   */
  constructor() {
  }

  /**
   * Defines the metadata of UsersResponse
   *
   * @returns {object} metadata of UsersResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'UsersResponse',
      type: {
        name: 'Composite',
        className: 'UsersResponse',
        modelProperties: {
          value: {
            required: true,
            serializedName: 'value',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'UsersResponseValueItemElementType',
                  type: {
                    name: 'Composite',
                    className: 'UsersResponseValueItem'
                  }
              }
            }
          }
        }
      }
    };
  }
}

module.exports = UsersResponse;
