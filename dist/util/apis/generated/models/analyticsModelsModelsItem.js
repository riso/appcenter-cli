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
 * Class representing a AnalyticsModelsModelsItem.
 */
class AnalyticsModelsModelsItem {
  /**
   * Create a AnalyticsModelsModelsItem.
   * @property {string} [modelName] Model's name.
   * @property {number} [count] Count current of model.
   * @property {number} [previousCount] Count of previous model.
   */
  constructor() {
  }

  /**
   * Defines the metadata of AnalyticsModelsModelsItem
   *
   * @returns {object} metadata of AnalyticsModelsModelsItem
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'AnalyticsModels_modelsItem',
      type: {
        name: 'Composite',
        className: 'AnalyticsModelsModelsItem',
        modelProperties: {
          modelName: {
            required: false,
            serializedName: 'model_name',
            type: {
              name: 'String'
            }
          },
          count: {
            required: false,
            serializedName: 'count',
            type: {
              name: 'Number'
            }
          },
          previousCount: {
            required: false,
            serializedName: 'previous_count',
            type: {
              name: 'Number'
            }
          }
        }
      }
    };
  }
}

module.exports = AnalyticsModelsModelsItem;
