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
 * Export configuration
 *
 */
class ExportConfigurationListResultValuesItemExportConfiguration {
  /**
   * Create a ExportConfigurationListResultValuesItemExportConfiguration.
   * @property {array} [exportEntities]
   * @property {string} [resourceName] The resource name on azure
   * @property {string} [resourceGroup] The resource group name on azure
   * @property {boolean} [backfill] Field to determine if backfilling should
   * occur. The default value is true. If set to false export starts from date
   * and time of config creation.
   * @property {string} type Polymorphic Discriminator
   */
  constructor() {
  }

  /**
   * Defines the metadata of ExportConfigurationListResultValuesItemExportConfiguration
   *
   * @returns {object} metadata of ExportConfigurationListResultValuesItemExportConfiguration
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ExportConfigurationListResult_valuesItem_export_configuration',
      type: {
        name: 'Composite',
        polymorphicDiscriminator: {
          serializedName: 'type',
          clientName: 'type'
        },
        uberParent: 'ExportConfigurationListResultValuesItemExportConfiguration',
        className: 'ExportConfigurationListResultValuesItemExportConfiguration',
        modelProperties: {
          exportEntities: {
            required: false,
            serializedName: 'export_entities',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ExportEntityElementType',
                  type: {
                    name: 'Enum',
                    allowedValues: [ 'crashes', 'errors', 'attachments', 'no_logs' ]
                  }
              }
            }
          },
          resourceName: {
            required: false,
            serializedName: 'resource_name',
            type: {
              name: 'String'
            }
          },
          resourceGroup: {
            required: false,
            serializedName: 'resource_group',
            type: {
              name: 'String'
            }
          },
          backfill: {
            required: false,
            serializedName: 'backfill',
            type: {
              name: 'Boolean'
            }
          },
          type: {
            required: true,
            serializedName: 'type',
            isPolymorphicDiscriminator: true,
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ExportConfigurationListResultValuesItemExportConfiguration;
