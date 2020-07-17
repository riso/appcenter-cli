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
 * Class representing a GetOKResponseItemDiffPackageMapValue.
 */
class GetOKResponseItemDiffPackageMapValue {
  /**
   * Create a GetOKResponseItemDiffPackageMapValue.
   * @property {number} size
   * @property {string} url
   */
  constructor() {
  }

  /**
   * Defines the metadata of GetOKResponseItemDiffPackageMapValue
   *
   * @returns {object} metadata of GetOKResponseItemDiffPackageMapValue
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'GetOKResponseItem_diff_package_mapValue',
      type: {
        name: 'Composite',
        className: 'GetOKResponseItemDiffPackageMapValue',
        modelProperties: {
          size: {
            required: true,
            serializedName: 'size',
            type: {
              name: 'Number'
            }
          },
          url: {
            required: true,
            serializedName: 'url',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = GetOKResponseItemDiffPackageMapValue;
