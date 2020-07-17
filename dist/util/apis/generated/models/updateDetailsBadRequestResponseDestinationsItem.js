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
 * Class representing a UpdateDetailsBadRequestResponseDestinationsItem.
 */
class UpdateDetailsBadRequestResponseDestinationsItem {
  /**
   * Create a UpdateDetailsBadRequestResponseDestinationsItem.
   * @property {string} [code] Error Codes:<br>
   * <b>invalid_store_secrets</b>: While distributing to store, secrets
   * provided for store are not valid.<br>
   * <b>store_release_bad_request</b>: Proper package release details for the
   * store is not provided.<br>
   * <b>store_release_unauthorized</b>: User is not authorized to publish to
   * store due to invalid developer credentials.<br>
   * <b>store_release_forbidden</b>: Publish to store is forbidden due to
   * conflicts/errors in the release version and already existing version in
   * the store.<br>
   * <b>store_release_promotion</b>: Release already distributed, promoting a
   * release is not supported.<br>
   * <b>store_track_deactivated</b>: One or more tracks would be deactivated
   * with this release. This is not supported yet.<br>
   * <b>store_release_not_found</b>: App with the given package name is not
   * found in the store.<br>
   * <b>store_release_not_available</b>: The release is not available.<br>
   * <b>internal_server_error</b>: Failed to distribute to a destination due to
   * an internal server error.
   * @property {string} [message]
   * @property {string} [id]
   * @property {string} [name]
   */
  constructor() {
  }

  /**
   * Defines the metadata of UpdateDetailsBadRequestResponseDestinationsItem
   *
   * @returns {object} metadata of UpdateDetailsBadRequestResponseDestinationsItem
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'UpdateDetailsBadRequestResponse_destinationsItem',
      type: {
        name: 'Composite',
        className: 'UpdateDetailsBadRequestResponseDestinationsItem',
        modelProperties: {
          code: {
            required: false,
            serializedName: 'code',
            type: {
              name: 'String'
            }
          },
          message: {
            required: false,
            serializedName: 'message',
            type: {
              name: 'String'
            }
          },
          id: {
            required: false,
            serializedName: 'id',
            type: {
              name: 'String'
            }
          },
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

module.exports = UpdateDetailsBadRequestResponseDestinationsItem;
