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
 * Basic information on a release
 *
 */
class ListOKResponseItemModelModelModelModelModelModelModel {
  /**
   * Create a ListOKResponseItemModelModelModelModelModelModelModel.
   * @property {number} [id] ID identifying this unique release.
   * @property {string} [version] The release's version.
   * For iOS: CFBundleVersion from info.plist.
   * For Android: android:versionCode from AppManifest.xml.
   * @property {string} [shortVersion] The release's short version.
   * For iOS: CFBundleShortVersionString from info.plist.
   * For Android: android:versionName from AppManifest.xml.
   * @property {string} [uploadedAt] UTC time in ISO 8601 format of the
   * uploaded time.
   * @property {string} [destinationType] Destination for this release.
   * Possible values include: 'group', 'store', 'tester'
   * @property {array} [distributionStores] a list of distribution stores that
   * are associated with this release.
   */
  constructor() {
  }

  /**
   * Defines the metadata of ListOKResponseItemModelModelModelModelModelModelModel
   *
   * @returns {object} metadata of ListOKResponseItemModelModelModelModelModelModelModel
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ListOKResponseItem',
      type: {
        name: 'Composite',
        className: 'ListOKResponseItemModelModelModelModelModelModelModel',
        modelProperties: {
          id: {
            required: false,
            serializedName: 'id',
            type: {
              name: 'Number'
            }
          },
          version: {
            required: false,
            serializedName: 'version',
            type: {
              name: 'String'
            }
          },
          shortVersion: {
            required: false,
            serializedName: 'short_version',
            type: {
              name: 'String'
            }
          },
          uploadedAt: {
            required: false,
            serializedName: 'uploaded_at',
            type: {
              name: 'String'
            }
          },
          destinationType: {
            required: false,
            serializedName: 'destination_type',
            type: {
              name: 'String'
            }
          },
          distributionStores: {
            required: false,
            serializedName: 'distribution_stores',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ListOKResponseItemDistributionStoresItemModelElementType',
                  type: {
                    name: 'Composite',
                    className: 'ListOKResponseItemDistributionStoresItemModel'
                  }
              }
            }
          }
        }
      }
    };
  }
}

module.exports = ListOKResponseItemModelModelModelModelModelModelModel;
