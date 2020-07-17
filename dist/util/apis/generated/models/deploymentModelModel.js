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
 * Class representing a DeploymentModelModel.
 */
class DeploymentModelModel {
  /**
   * Create a DeploymentModelModel.
   * @property {string} [key]
   * @property {string} name
   * @property {object} [latestRelease]
   * @property {string} [latestRelease.targetBinaryRange]
   * @property {string} [latestRelease.description]
   * @property {boolean} [latestRelease.isDisabled]
   * @property {boolean} [latestRelease.isMandatory]
   * @property {number} [latestRelease.rollout]
   * @property {string} [latestRelease.label]
   * @property {string} [latestRelease.packageHash]
   * @property {string} [latestRelease.blobUrl]
   * @property {object} [latestRelease.diffPackageMap]
   * @property {string} [latestRelease.originalDeployment] Set on 'Promote'
   * @property {string} [latestRelease.originalLabel] Set on 'Promote' and
   * 'Rollback'
   * @property {string} [latestRelease.releasedBy]
   * @property {string} [latestRelease.releaseMethod] The release method is
   * unknown if unspecified. Possible values include: 'Upload', 'Promote',
   * 'Rollback'
   * @property {number} [latestRelease.size]
   * @property {number} [latestRelease.uploadTime]
   */
  constructor() {
  }

  /**
   * Defines the metadata of DeploymentModelModel
   *
   * @returns {object} metadata of DeploymentModelModel
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'deployment',
      type: {
        name: 'Composite',
        className: 'DeploymentModelModel',
        modelProperties: {
          key: {
            required: false,
            serializedName: 'key',
            type: {
              name: 'String'
            }
          },
          name: {
            required: true,
            serializedName: 'name',
            type: {
              name: 'String'
            }
          },
          latestRelease: {
            required: false,
            serializedName: 'latest_release',
            type: {
              name: 'Composite',
              className: 'DeploymentLatestReleaseModel'
            }
          }
        }
      }
    };
  }
}

module.exports = DeploymentModelModel;
