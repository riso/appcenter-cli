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
 * The url that can be navigated to in order to start the device registration
 * process.
 *
 */
class DeviceRegistrationUrl {
  /**
   * Create a DeviceRegistrationUrl.
   * @property {string} registrationUrl The url that can be navigated to in
   * order to start the device registration process.
   */
  constructor() {
  }

  /**
   * Defines the metadata of DeviceRegistrationUrl
   *
   * @returns {object} metadata of DeviceRegistrationUrl
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'DeviceRegistrationUrl',
      type: {
        name: 'Composite',
        className: 'DeviceRegistrationUrl',
        modelProperties: {
          registrationUrl: {
            required: true,
            serializedName: 'registration_url',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = DeviceRegistrationUrl;
