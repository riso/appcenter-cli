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
 * The information for a resign attempt.
 *
 */
class ResignInfo {
  /**
   * Create a ResignInfo.
   * @property {string} [groupName] The group name of the resign attempt
   * @property {string} [profileName] The provisioning profile name of group
   * for the given resign attempt
   * @property {string} [profileType] The provisioning profile type of group
   * for the given resign attempt
   * @property {string} [certificateName] The name of the certificate used for
   * the resign attempt
   * @property {string} [certificateExpiration] The expiration date of the
   * certificate used for the resign attempt
   */
  constructor() {
  }

  /**
   * Defines the metadata of ResignInfo
   *
   * @returns {object} metadata of ResignInfo
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ResignInfo',
      type: {
        name: 'Composite',
        className: 'ResignInfo',
        modelProperties: {
          groupName: {
            required: false,
            serializedName: 'group_name',
            type: {
              name: 'String'
            }
          },
          profileName: {
            required: false,
            serializedName: 'profile_name',
            type: {
              name: 'String'
            }
          },
          profileType: {
            required: false,
            serializedName: 'profile_type',
            type: {
              name: 'String'
            }
          },
          certificateName: {
            required: false,
            serializedName: 'certificate_name',
            type: {
              name: 'String'
            }
          },
          certificateExpiration: {
            required: false,
            serializedName: 'certificate_expiration',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ResignInfo;
