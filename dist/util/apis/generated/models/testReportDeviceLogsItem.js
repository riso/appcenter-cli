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
 * Class representing a TestReportDeviceLogsItem.
 */
class TestReportDeviceLogsItem {
  /**
   * Create a TestReportDeviceLogsItem.
   * @property {string} [deviceSnapshotId]
   * @property {string} [deviceLog]
   * @property {string} [testLog]
   * @property {string} [appiumLog]
   */
  constructor() {
  }

  /**
   * Defines the metadata of TestReportDeviceLogsItem
   *
   * @returns {object} metadata of TestReportDeviceLogsItem
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'TestReport_device_logsItem',
      type: {
        name: 'Composite',
        className: 'TestReportDeviceLogsItem',
        modelProperties: {
          deviceSnapshotId: {
            required: false,
            serializedName: 'device_snapshot_id',
            type: {
              name: 'String'
            }
          },
          deviceLog: {
            required: false,
            serializedName: 'device_log',
            type: {
              name: 'String'
            }
          },
          testLog: {
            required: false,
            serializedName: 'test_log',
            type: {
              name: 'String'
            }
          },
          appiumLog: {
            required: false,
            serializedName: 'appium_log',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = TestReportDeviceLogsItem;
